// CREATE & UPDATE & DELETE a COMMENT on an Event's Page

// POST a new COMMENT to table
const addCommentFormHandler = async (event) => {
    event.preventDefault();

    const text = document.querySelector('#comment-text').value.trim();
    console.log(text);

    // CREATE-POST a COMMENT 
    if (text) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ text }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            location.reload();
        } else {
            alert(response.statusText);
        }
    }
};
document.querySelector('#submitComment-btn').addEventListener('click', (event) => {
    addCommentFormHandler(event);
});

// DELETE a COMMENT
const delCommentButtonHandler = async (event) => {

    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        console.log(id);

        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            location.reload();
        } else {
            alert('Failed to delete comment');
        }
    }
};
document.querySelector('.comments').addEventListener('click', delCommentButtonHandler);

// EDIT A COMMENT
// User clicks on edit comment button IF user OWNs the comment - see handlebar for {{if ownsComment}}
// function eventCommentForm() {
//     document.querySelector('#commentEditCard').style.display = 'block';

//     const commentEditForm = document.querySelector('.edit-comment-form');
//     commentEditForm.scrollIntoView({ behavior: 'smooth', block: "start" });
// }

// // PUT for DB
// const editCommentFormHandler = async (event) => {
//     event.preventDefault();

//     const text = document.querySelector('#editcomment-text').value.trim();

//     if (event.target.hasAttribute('data-id')) {
//         const id = event.target.getAttribute('data-id');

//         const response = await fetch(`/api/comments/${id}`, {
//             method: 'PUT',
//             body: JSON.stringify({ text }),
//             headers: { 'Content-Type': 'application/json' },
//         });

//         // IF response is successful, then reload
//         if (response.ok) {
//             document.location.reload();
//         } else {
//             console.log(response.statusText);
//         }

//     };
// };

// document.querySelector('#submitEditComment-btn').addEventListener('click', (event) => {
//     editCommentFormHandler(event);
// });

const lists = document.querySelectorAll(".filter-list");
lists.forEach(function (list) {
    const liCount = list.querySelectorAll("li").length;
    if (liCount > 5) {
        list.querySelector(".more").classList.add("showMe");
    }
});

const moreEls = document.querySelectorAll(".more");
moreEls.forEach(function (more) {
    more.addEventListener("click", function (evt) {
        const more = evt.target;
        const ul = more.previousElementSibling;
        ul.querySelector("li").forEach(function (li) {
            li.toggleClass("showList");
        });
        more.innerHTML = more.innerHTML.includes("more")
            ? "See less..."
            : "See more...";
    });
});