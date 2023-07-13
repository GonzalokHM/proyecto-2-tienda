const commentsTemplate = `
<div id="comments-container">
<div id="form-container">
  <form id="comments-form">
    <div class="input">
      <label for="name-input" class="form-label">Nombre:</label>
      <input type="text" id="name-input" name="name" required>
    </div>
    <div class="input">
      <label for="email-input" class="form-label">Email:</label>
      <input type="email" id="email-input" name="email" required>
    </div>
    <div class="input">
      <label for="comment-input" class="form-label">Comentario:</label>
      <textarea id="comment-input" name="comment" required></textarea>
    </div>
          
    <button type="submit">Send</button>
  </form>
  <button id="load-comments">Ver comentarios</button>
    <div id="loadingIndicator" style="display: none;">
    <div class="loader"></div>
    </div>
  <ul id="comments-list"></ul>
  </div>
</div>
`;

export default commentsTemplate
