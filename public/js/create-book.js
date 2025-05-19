import { createBook, uploadBookImage } from './api.js';

document.getElementById('create-book-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {
    title: formData.get('title'),
    isbn: formData.get('isbn'),
    edition: formData.get('edition') || undefined,
    publisher: formData.get('publisher') || undefined,
    publicationYear: formData.get('publicationYear') ? parseInt(formData.get('publicationYear')) : undefined,
    pageCout: formData.get('pageCout') ? parseInt(formData.get('pageCout')) : undefined,
    language: formData.get('language') || undefined,
    digitalCopyUrl: formData.get('digitalCopyUrl') || undefined,
    keywords: formData.get('keywords') ? formData.get('keywords').split(',').map(k => k.trim()) : [],
    authors: formData.get('authors') ? formData.get('authors').split(',').map(a => a.trim()) : [],
  };

  const result = await createBook(data);
  if (result.ok) {
    const imageFile = formData.get('image');
    if (imageFile && imageFile.size > 0) {
      const imageResult = await uploadBookImage(result.data.id, imageFile);
      if (!imageResult.ok) {
        alert('Book created, but image upload failed: ' + imageResult.msg);
        return;
      }
    }
    alert('Book created successfully!');
    e.target.reset();
  } else {
    alert('Failed to create book: ' + result.msg);
  }
});