function loadscript() {
  /*
  foldedElement = document.querySelector('.collapsible-block-folded')
  unfoldedElement = document.querySelector('.collapsible-block-unfolded')
  foldedLink = foldedElement.querySelector('.collapsible-block-link')
  unfoldedLinks = unfoldedElement.querySelectorAll(':scope > .collapsible-block-unfolded-link > .collapsible-block-link')
  foldedLink.addEventListener('click', () => {
    unfoldedElement.style.display = 'block'
    foldedElement.style.display = 'none'
  })
  unfoldedLinks.forEach((unfoldedLink) => unfoldedLink.addEventListener('click', () => {
    unfoldedElement.style.display = 'none'
    foldedElement.style.display = 'block'
  }))
  */

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
    // foldedLink.addEventListener('click', () => {
      // console.log('clicked', foldedLink.innerHTML)
      // unfoldedElement.style.display = 'block'
      // foldedElement.style.display = 'none'

    // })
    foldedLink.addEventListener('click', createFolder(unfoldedElement,foldedElement))
    // unfoldedLinks.forEach((unfoldedLink) => unfoldedLink.addEventListener('click', () => {
      // console.log('clicked', unfoldedLink.innerHTML)
      // unfoldedElement.style.display = 'none'
      // foldedElement.style.display = 'block'
    // }))
    unfoldedLinks.forEach((unfoldedLink) => unfoldedLink.addEventListener('click', createUnfolder(unfoldedElement,foldedElement)))
  })

}