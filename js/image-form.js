const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR_URL ='img/muffin-grey.svg';
const DefaultImageSize = {
  WIDTH : 70,
  HEIGHT : 70,
};

const avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const adImageFileChooser = document.querySelector('.ad-form__upload input[type=file]');
const adImagePreview = document.querySelector('.ad-form__photo');

const showPreviewImage = (fileChooser, previewBlock) => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    })

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        if (previewBlock.children.length === 0) {
          const img = document.createElement('img');
          img.src = reader.result;
          img.width = DefaultImageSize.WIDTH;
          img.height = DefaultImageSize.HEIGHT;
          previewBlock.appendChild(img);
        } else {
          previewBlock.children[0].src = reader.result;
        }
      });

      reader.readAsDataURL(file);
    }
  })
}

const removePreviewImage = () => {
  while (adImagePreview.firstChild) {
    adImagePreview.removeChild(adImagePreview.firstChild);
  }
  avatarPreview.children[0].src = DEFAULT_AVATAR_URL;
}

showPreviewImage(avatarFileChooser, avatarPreview);
showPreviewImage(adImageFileChooser, adImagePreview);

export { removePreviewImage }
