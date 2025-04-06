use ftml::render::Render;
use ftml::render::html::HtmlRender;
use ftml::prelude::PageInfo;
use ftml::prelude::WikitextMode;
use ftml::prelude::WikitextSettings;
use std::borrow::Cow;
use std::rc::Rc;
use std::fs;
use ftml::data::NullPageCallbacks;
use regex::Regex;

fn main() {
    let input_filename = std::env::args().nth(1).expect("no input file given");
    let output_filename = std::env::args().nth(2).expect("no output file given");

    let input_file = fs::File::open(input_filename).expect("file should open read only");
    let json: serde_json::Value =
        serde_json::from_reader(input_file).expect("file should be proper json");
    let title = json.get("title")
        .expect("file should have title key")
        .to_string()
        .replace("\"","");
    let mut source = json.get("source")
        .expect("file should have source key")
        .to_string();
    
    source = source.replace(r#"\""#, "\"")
        .replace("[[>]]", "")
        .replace("[[/>]]", "")
        .replace("[[module Rate]]", "");
    source = Regex::new(r#"^\"\\n\\n\\n\\n\\n"#).unwrap().replace_all(&source, "").to_string();

    let page_info = PageInfo {
        domain: Cow::from("scpfoundation.net"),
        title: Cow::from(title.clone()),
        alt_title: None,
        category: None,
        language: Cow::from("default"),
        media_domain: Cow::from("files.scpfoundation.net"),
        page: Cow::from(title.clone()),
        rating: 0.0,
        site: Cow::from("local"),
        tags:vec![], //todo: parse from source
    };
    let settings = WikitextSettings::from_mode(WikitextMode::Page);
    let callbacks = Rc::new(NullPageCallbacks{});

    ftml::preprocess(&mut source);
    let tokens = ftml::tokenize(&source);
    let result = ftml::parse(&tokens, &page_info, callbacks.clone(),&settings);
    let (tree, _warnings) = result.into();
    let html_output = HtmlRender.render(&tree, &page_info, callbacks, &settings);

    let head = "<script src='script.js'></script><link rel='stylesheet' href='style.css'>";

    // TODO - maybe add tags between title and html_output.body
    let mut content = "<html><title>".to_owned() + &title + "</title>"+head+ "</head><body onload='loadscript();'>" +"<h1>" + &title + "</h1>" + &html_output.body + "</body></html>";
    content = content.replace("\\n","<br>");
    let re = Regex::new(r#"href="/(.*?)""#).unwrap();
    content = re.replace_all(&content, r#"href="$1.html""#).to_string();
    fs::write(output_filename, &content).expect("unable to write html to file");
}
