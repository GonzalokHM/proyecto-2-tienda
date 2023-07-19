const templateForm = `
<form id="comments-form">
  <div class="input">
    <input type="text" placeholder="nombre👈" id="name-input" name="name" required >
  </div>
  <div class="input">
    <input type="email" placeholder="@email👈" id="email-input" name="email" required>
  </div>
  <div class="input">
    <textarea id="comment-input" placeholder="👇comentario aqui👇" name="comment" required></textarea>
  </div>
  <button type="submit">Send</button>
</form>
`

export default templateForm;