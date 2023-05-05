import "./comments.css";


const getcommentsCardTemplate = (name, email, body,) => `
<h3>${name}</h3>
<p>email: ${email}</p>
<p>comment: ${body}</p>
`;

const getComments = async () => {
try {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments');
  const comments = await response.json();
  console.log(comments);
  
  const commentsContainer = document.getElementById('comments-container');
  comments.forEach(comment => {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    // Utilizar innerHTML para establecer el contenido del comentario como HTML
    commentElement.innerHTML = getcommentsCardTemplate(comment.name, comment.email, comment.body); 
    commentsContainer.appendChild(commentElement);
  });
} catch (err) {
  console.error(err);
  alert('Ha ocurrido un error conectando a la API');

  const img = document.createElement('img');
  img.src = 'https://1.bp.blogspot.com/_FUCD-ZQp98g/TD1hkNv9knI/AAAAAAAACDY/gQZWdJh4qwo/s1600/problema_tecnico.jpg';
  
  document.body.appendChild(img);
}};

const loadCommentsButton = document.querySelector('#load-comments');

loadCommentsButton.addEventListener('click', () => {
getComments();
});

const state = { comments: [] }; // Creamos un objeto para almacenar los comentarios

const commentsForm = document.getElementById('comments-form');
const commentsList = document.getElementById('comments-list');

const showComments = () => {
  commentsList.innerHTML = '';
  state.comments.forEach(comment => {
    const li = document.createElement('li');
    li.innerHTML = getcommentsCardTemplate(comment.name, '', comment.text);
    commentsList.appendChild(li);
  });
};

commentsForm.addEventListener('submit', async event => {
  event.preventDefault();
  const nameInput = commentsForm.querySelector('input[name="name"]');
  const textInput = commentsForm.querySelector('textarea[name="text"]');
  const name = nameInput.value.trim();
  const text = textInput.value.trim();
  if (name && text) {
    state.comments.push({ name, text });
    showComments();
    nameInput.value = '';
    textInput.value = '';
  }});
    showComments();

