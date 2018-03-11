$(document).ready(() => {
  $('.header-signup').on('click', () => {
    $('.signupDialog').removeClass('hidden');
    $('.signupDialog').dialog();
  })
  $('.header-log').on('click', () => {
    $('.loginDialog').removeClass('hidden');
    $('.loginDialog').dialog();
  })
  $('.submitNewTechniqueButton').on('click', (e) => {
    handleSubmitNewTechniqueButton(e);
  })
  $('.postNewCommentButton').on('click', (e) => {
    handlePostNewCommentButton(e);
  })
  $('.updateTechniqueButton').on('click', (e) => {
    enterEditTechniqueMode(e);
  })
  $('.deleteTechniqueButton').on('click', (e) => {
    handleDeleteTechniqueButton(e);
  })
  $('.saveChangesToTechniqueButton').on('click', (e) => {
    handleSaveChangesToTechniqueButton(e);
  })
})

const enterEditTechniqueMode = (e) => {
  e.target.parentNode.childNodes[7].classList.add('hidden');
  e.target.parentNode.childNodes[10].classList.add('hidden');
  e.target.classList.add('hidden');
  e.target.parentNode.childNodes[8].classList.remove('hidden');
  e.target.parentNode.childNodes[11].classList.remove('hidden');
  e.target.parentNode.childNodes[15].classList.remove('hidden');
  let getRequestUrl = '/api' + e.view.window.location.pathname;
  $.ajax({
    method: "GET",
    url: getRequestUrl,
    success: (json) => {
      e.target.parentNode.childNodes[8].value = json.shortDescription;
      e.target.parentNode.childNodes[11].value = json.detailedDescription;
    },
    error: () => {
      console.log("error retrieving current technique description");
    }
  })
}

const handleSaveChangesToTechniqueButton = (e) => {
  let updatedShortDescription = e.target.parentNode.childNodes[8].value;
  let updatedDetailedDescription = e.target.parentNode.childNodes[11].value;
  let putRequestUrl = '/api' + e.view.window.location.pathname;
  $.ajax({
    method: "PUT",
    url: putRequestUrl,
    data: {
      shortDescription: updatedShortDescription,
      detailedDescription: updatedDetailedDescription
    },
    success: (json) => {
      e.target.parentNode.childNodes[7].classList.remove('hidden');
      e.target.parentNode.childNodes[10].classList.remove('hidden');
      e.target.parentNode.childNodes[13].classList.remove('hidden');
      e.target.parentNode.childNodes[8].classList.add('hidden');
      e.target.parentNode.childNodes[11].classList.add('hidden');
      e.target.parentNode.childNodes[15].classList.add('hidden');
      e.target.parentNode.childNodes[7].innerHTML = json.shortDescription;
      e.target.parentNode.childNodes[10].innerHTML = json.detailedDescription;
    },
    error: () => {
      console.log("error updating technique!");
    }
  })
}

// disorders/:disorder_id/techniques/:technique_id
const handleDeleteTechniqueButton = (e) => {
  let techniqueBox = e.target.parentNode;
  let currentPath = e.view.window.location.pathname;
  let url = '/api' + currentPath + '/' + e.target.dataset.techniqueid;
  $.ajax({
    method: 'DELETE',
    url: url,
    success: () => {
      console.log("succesful removal of technique");
      techniqueBox.parentNode.removeChild(techniqueBox);
    },
    error: () => {
      console.log("error deleting technique");
    }
  })
}


const handlePostNewCommentButton = (e) => {
  console.log(e);
  console.log(e.target.dataset.techniqueid);
  let currentPath = e.view.window.location.pathname;
  let comment = e.target.previousElementSibling.value;
  let url = '/api/techniques/' + e.target.dataset.techniqueid;
  let currentDate = getCurrentDate();
  $.ajax({
    method: 'POST',
    url: url,
    data: {
      comment: comment,
      userName: "db_owner",
      date: currentDate
    },
    success: (json) => {
      e.target.previousElementSibling.value = "";
      console.log('success');
      console.log(json);
      // $.ajax({
      //   method: 'GET',
      //   url: currentPath
      // })
    },
    error: () => {
      console.log("ajax post comment error");
    }
  })
}

const handleSubmitNewTechniqueButton = (e) => {
  console.log(e);
  let shortDescription = e.target.previousElementSibling.previousElementSibling.value;
  let detailedDescription = e.target.previousElementSibling.value;
  let url = '/api/disorders/' + e.target.dataset.disorderId + '/techniques';
  let currentPath = e.view.window.location.pathname;
  $.ajax({
    method: "POST",
    url: url,
    data: {
      shortDescription: shortDescription,
      detailedDescription: detailedDescription
    },
    success: (json) => {
      e.target.previousElementSibling.previousElementSibling.value = '';
      e.target.previousElementSibling.value = '';
      // let newTechniqueHtml = getNewTechniqueHtml(json);
      // let newTechniqueDiv = document.createElement('div');
      // console.log(newTechniqueHtml);
      // newTechniqueDiv.insertAdjacentHTML('beforeend', newTechniqueHtml[2]);
      // e.target.parentNode.parentNode.prepend(newTechniqueDiv);
      // console.log(json);
    },
    error: () => {
      console.log("ajax post error!");
    }
  })
}

const getCurrentDate = () => {
  let today = new Date();
  let yyyy = today.getFullYear();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  return mm + "/" + dd + "/" + yyyy;
}

const getNewTechniqueHtml = (json) => {
let html = [];
html.push('<fieldset></fieldset>');
html.push('<h3></h3>');
html.push(('<a href="http://localhost:3000/disorders/' + json[0]._id + '/techniques/' + json[1]._id + '>' + json[1].shortDescription + '</a>'));
html.push('<p>' + json[1].detailedDescription + '</p>');
html.push('<button class="deleteTechniqueButton" data-disorderId="' + json[0]._id + " data-techniqueId=" + json[1]._id + '>Delete Technique</button>');
  return html;
}
