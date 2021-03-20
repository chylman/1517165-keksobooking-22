const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DefaultImageSize = {
  WIDTH : 200,
  HEIGHT : 200,
}

const avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
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
        if (!adImagePreview.children.length === 0) {
          previewBlock.src = reader.result;
        } else {
          const img = document.createElement('img');
          img.src = reader.result;
          img.width = DefaultImageSize.WIDTH;
          img.height = DefaultImageSize.HEIGHT;
          previewBlock.appendChild(img);
        }

      });

      reader.readAsDataURL(file);
    }
  })
}

showPreviewImage(avatarFileChooser, avatarPreview);
showPreviewImage(adImageFileChooser, adImagePreview);
