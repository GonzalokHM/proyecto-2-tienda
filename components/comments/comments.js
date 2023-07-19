import "./comments.css";
import commentsTemplate from "./commentsTemplate";
import templateForm from "./commentsTemplateForm";

const commentsContainer = document.getElementById('comments-container');
commentsContainer.innerHTML = commentsTemplate;

const loadingFormButton = document.getElementById('loadingForm');
loadingFormButton.addEventListener('click', () => {
  const formContainer = document.getElementById('form-container');
  formContainer.innerHTML = templateForm;

  const commentsForm = document.getElementById('comments-form');
  commentsForm.addEventListener('submit', handleFormSubmit);
  
});

document.addEventListener('input', event => {
  if (event.target && event.target.matches('#comments-form textarea')) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
});

const getcommentsCardTemplate = (name, email, body) => `
<h3>${name}</h3>
<p><span class="label">email:</span> ${email}</p>
<p><span class="label">comment:</span> ${body}</p>
`;

let commentsFromAPI = [];

const getComments = async () => {
  try {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const loadCommentsButton = document.getElementById('load-comments');
    loadingIndicator.style.display = 'flex'; // Mostrar indicador de carga
    loadCommentsButton.disabled = true; // Deshabilitar el botón de carga mientras se realiza la petición

    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments');
    commentsFromAPI = await response.json();
    showComments();
  } catch (err) {
    console.error(err);
    alert('Ha ocurrido un error conectando a la API');
    const img = document.createElement('img');
    img.src = 'https://1.bp.blogspot.com/_FUCD-ZQp98g/TD1hkNv9knI/AAAAAAAACDY/gQZWdJh4qwo/s1600/problema_tecnico.jpg';
    document.body.appendChild(img);
  }
  finally {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const loadCommentsButton = document.getElementById('load-comments');

    loadingIndicator.style.display = 'none'; // Ocultar indicador de carga
    loadCommentsButton.disabled = false; // Habilitar el botón de carga nuevamente
  }
};

const loadCommentsButton = document.querySelector('#load-comments');
loadCommentsButton.addEventListener('click', () => {
getComments();
});

const state = { comments: [] }; // Creamos un objeto para almacenar los comentarios

const commentsList = document.getElementById('comments-list');

const showComments = () => {
  commentsList.innerHTML = '';
  const allComments = [...state.comments, ...commentsFromAPI];
  allComments.forEach(comment => {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = getcommentsCardTemplate(comment.name, comment.email, comment.body);
    commentsList.appendChild(commentElement);
  });
};

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

 const handleFormSubmit = async (event) => {
  const commentsForm = document.getElementById('comments-form');
  event.preventDefault();
  const nameInput = commentsForm.querySelector('input[name="name"]');
  const emailInput = commentsForm.querySelector('input[name="email"]');
  const textInput = commentsForm.querySelector('textarea[name="comment"]');
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  console.log(textInput.value)
  const body = textInput.value.trim();
  if (name && body && isValidEmail(email)) {
    state.comments.push({ name, email, body });
    showComments();
    nameInput.value = '';
    emailInput.value = '';
    textInput.value = '';
  }
}

export {handleFormSubmit};