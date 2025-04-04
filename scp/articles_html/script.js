function loadscript() {
  function createFolder(ue, fe) {
    return function () {
      ue.style.display = 'block'
      fe.style.display = 'none'
    }
  }

  function createUnfolder(ue, fe) {
    return function () {
      ue.style.display = 'none'
      fe.style.display = 'block'
    }
  }

  collabsibleBlocks = document.querySelectorAll('.collapsible-block')
  collabsibleBlocks.forEach((cb) => {
    foldedElement = cb.querySelector('.collapsible-block-folded')
    unfoldedElement = cb.querySelector('.collapsible-block-unfolded')
    foldedLink = foldedElement.querySelector('.collapsible-block-link')
    unfoldedLinks = unfoldedElement.querySelectorAll('.collapsible-block-unfolded-link')
    foldedLink.addEventListener('click', createFolder(unfoldedElement,foldedElement))
    unfoldedLinks.forEach((unfoldedLink) => unfoldedLink.addEventListener('click', createUnfolder(unfoldedElement,foldedElement)))
  })
}
