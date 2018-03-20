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
  $('.saveChangesDisorderDescButton').on('click', (e) => {
    handleSaveChangesDisorderDescButton(e);
  })
  $('.saveChangesDisorderCautionsButton').on('click', (e) => {
    handleSaveChangesDisorderCautionsButton(e);
  })
  $('.deleteCommentButton').on('click', (e) =>{
    handleDeleteCommentButton(e);
  })
  $('.editDisorderDescButton').on('click', (e) => {
    handleEditDisorderDescButton(e);
  })
  $('.editDisorderCautionsButton').on('click', (e) => {
    handleEditDisorderCautionsButton(e);
  })
  $('.cancelChangesDisorderDescButton').on('click', (e) => {
    handleCancelChangesDisorderDescButton(e);
  })
  $('.cancelChangesDisorderCautionsButton').on('click', (e) => {
    handleCancelChangesDisorderCautionsButton(e);
  })
  $('.loginButton').on('click', (e) => {
    e.preventDefault();
    let loginEmail = document.getElementById('loginEmailInput').value;
    let loginPassword = document.getElementById('loginPasswordInput').value;
    if (loginEmail !== '' && loginPassword !== '') {
      console.log('if statement was triggered');
      $.ajax({
        method: 'POST',
        url: '/login',
        data: {
          email: loginEmail,
          password: loginPassword
        },
        success: () => {
          window.location = window.location.origin;
        },
        error: () => {
          console.log('login failed');
        }
      })
    }
  })
  $('#signupButton').on('click', (e) => {
    if (firstName && lastName && username && email && confirmEmail && password && confirmPassword) {
      $.ajax({
        method: 'POST',
        url: '/signup',
        data: {
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password
        },
        success: () => {
          window.location = window.location.origin;
        },
        error: () => {
          console.log('error creating new user');
        }
      })
    }
  })
  let firstName;
  let lastName;
  let username;
  let email;
  let confirmEmail;
  let password;
  let confirmPassword;

  const signupFirstNameInput = document.getElementById('signupFirstNameInput');
  const signupLastNameInput = document.getElementById('signupLastNameInput');
  const signupUsernameInput = document.getElementById('signupUsernameInput');
  const signupEmailInput = document.getElementById('signupEmailInput');
  const signupConfirmEmailInput = document.getElementById('signupConfirmEmailInput');

  // signupFirstNameInput.onfocus = () => {
  //   signupFirstNameInput.classList.add('input-edit-mode');
  //   signupFirstNameInput.classList.remove('invalid-input');
  // }
  // signupLastNameInput.onfocus = () => {
  //   signupLastNameInput.classList.add('input-edit-mode');
  //   signupLastNameInput.classList.remove('invalid-input');
  // }
  // signupUsernameInput.onfocus = () => {
  //   signupUsernameInput.classList.add('input-edit-mode');
  //   signupUsernameInput.classList.remove('invalid-input');
  // }
  // signupEmailInput.onfocus = () => {
  //   signupEmailInput.classList.add('input-edit-mode');
  //   signupEmailInput.classList.remove('invalid-input');
  // }
  // signupConfirmEmailInput.onfocus = () => {
  //
  // }
  signupFirstNameInput.onblur = () => {
    if (signupFirstNameInput.value === '') {
      console.log('First Name field cannot be blank');
      signupFirstNameInput.classList.add('invalid-input');
    } else if (signupFirstNameInput.value.length > 50) {
      console.log('First Name must be less than 50 characters long');
    } else {
      firstName = signupFirstNameInput.value;
      console.log(firstName);
    }
  }
  signupLastNameInput.onblur = () => {
    signupLastNameInput.classList.remove('input-edit-mode');
    if (signupLastNameInput.value === '') {
      console.log('Last Name field cannot be blank');
      signupLastNameInput.classList.add('invalid-input');
    } else if (signupLastNameInput.value.length > 50) {
      console.log('First Name must be less than 50 characters long');
    } else {
      lastName = signupLastNameInput.value;
      console.log(lastName);
    }
  }
  signupUsernameInput.onblur = () => {
    if (signupUsernameInput.value === '') {
      console.log('Username field can\'t be blank');
      signupUsernameInput.classList.add('invalid-input');
    } else if (signupUsernameInput.value.match(/^[a-zA-Z0-9]+$/)) {
      console.log('this is the correct format');
      username = signupUsernameInput.value;
      console.log(username);
    } else {
      console.log('this is not the correct format');
      signupUsernameInput.classList.add('invalid-input');
    }
  }
  signupEmailInput.onblur = () => {
    if (signupEmailInput.value === '') {
      console.log('email must be provided');
      signupEmailInput.classList.add('invalid-input');
    } else if (signupEmailInput.value.match(/\S+@\S+\.\S+/)) {
      console.log('this is the correct form for an email');
      email = signupEmailInput.value.toLowerCase();
      console.log(email);
    } else {
      console.log('this is not the correct format');
      signupEmailInput.classList.add('invalid-input');
    }
  }
  signupConfirmEmailInput.onblur = () => {
    if (signupConfirmEmailInput.value === '') {
      console.log('please confirm email');
      signupConfirmEmailInput.classList.add('invalid-input');
    } else if (signupConfirmEmailInput.value.match(/\S+@\S+\.\S+/) && signupConfirmEmailInput.value.toLowerCase() === email) {
      console.log('email addresses match');
      confirmEmail = signupConfirmEmailInput.value.toLowerCase();
    } else {
      console.log('incorrect;')
    }
  }
  signupPasswordInput.onblur = () => {
    if (signupPasswordInput.value === '') {
      console.log('please enter a password');
    } else if (signupPasswordInput.value.match(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)) {
      console.log('successfully created a strong password');
      password = signupPasswordInput.value;
    } else {
      console.log('password must contain a lowercase letter, an uppercase letter, a number, a special symbol (!, @, #, $, %, ^, or &) and must be at least 8 characters long');
    }
  }
  signupConfirmPasswordInput.onblur = () => {
    if (signupConfirmPasswordInput.value === '') {
      console.log('please confirm password');
    } else if (signupPasswordInput.value === signupConfirmPasswordInput.value) {
      console.log('password successfully retyped');
      confirmPassword = signupConfirmPasswordInput.value;
    } else {
      console.log('please make sure that password matches');
    }
  }

})

const enterEditTechniqueMode = (e) => {
  e.target.parentNode.childNodes[7].classList.add('hidden');
  e.target.parentNode.childNodes[10].classList.add('hidden');
  e.target.classList.add('hidden');
  e.target.parentNode.childNodes[8].classList.remove('hidden');
  e.target.parentNode.childNodes[11].classList.remove('hidden');
  e.target.parentNode.childNodes[15].classList.remove('hidden');
  let getRequestUrl = '/api/v1' + e.view.window.location.pathname;
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

const handleEditDisorderDescButton = (e) => {
  $('.editDisorderDescButton').addClass('hidden');
  $('.saveChangesDisorderDescButton').removeClass('hidden');
  $('.cancelChangesDisorderDescButton').removeClass('hidden');
  $('.editDisorderDescTextarea').removeClass('hidden');
}

const handleEditDisorderCautionsButton = (e) => {
  $('.editDisorderCautionsButton').addClass('hidden');
  $('.saveChangesDisorderCautionsButton').removeClass('hidden');
  $('.cancelChangesDisorderCautionsButton').removeClass('hidden');
  $('.editDisorderCautionsTextarea').removeClass('hidden');
}

const handleCancelChangesDisorderDescButton = (e) => {
  $('.editDisorderDescButton').removeClass('hidden');
  $('.saveChangesDisorderDescButton').addClass('hidden');
  $('.cancelChangesDisorderDescButton').addClass('hidden');
  document.getElementsByClassName('editDisorderDescTextarea')[0].value = document.getElementsByClassName('disorder-description')[0].innerHTML;
  $('.editDisorderDescTextarea').addClass('hidden');
}

const handleCancelChangesDisorderCautionsButton = (e) => {
  $('.editDisorderCautionsButton').removeClass('hidden');
  $('.saveChangesDisorderCautionsButton').addClass('hidden');
  $('.cancelChangesDisorderCautionsButton').addClass('hidden');
  document.getElementsByClassName('editDisorderCautionsTextarea')[0].value = document.getElementsByClassName('disorder-cautions')[0].innerHTML;
  $('.editDisorderCautionsTextarea').addClass('hidden');
}

const handleSaveChangesDisorderDescButton = (e) => {
  let newDisorderDesc = document.getElementsByClassName('editDisorderDescTextarea')[0].value;
  let putRequestUrl = '/api/v1' + window.location.pathname + '/update-description';
  $.ajax({
    method: "PUT",
    url: putRequestUrl,
    data: {
      description: newDisorderDesc
    },
    success: () => {
      window.location = window.location.href;
    },
    error: () => {
      console.log('error updating description');
    }
  })
}

const handleSaveChangesDisorderCautionsButton = (e) => {
  let newDisorderCautions = document.getElementsByClassName('editDisorderCautionsTextarea')[0].value;
  let putRequestUrl = '/api/v1' + window.location.pathname + '/update-cautions';
  $.ajax({
    method: "PUT",
    url: putRequestUrl,
    data: {
      cautions: newDisorderCautions
    },
    success: () => {
      window.location = window.location.href;
    },
    error: () => {
      console.log('error updating cautions');
    }
  })
}

const handleSaveChangesToTechniqueButton = (e) => {
  let updatedShortDescription = e.target.parentNode.childNodes[8].value;
  let updatedDetailedDescription = e.target.parentNode.childNodes[11].value;
  let putRequestUrl = '/api/v1' + e.view.window.location.pathname;
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
  let url = '/api/v1' + currentPath + '/' + e.target.dataset.techniqueid;
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

const handleDeleteCommentButton = (e) => {
  let currentTechniqueId = window.location.pathname.split('/')[4];
  let deleteCommentReqUrl = '/api/v1/techniques/' + currentTechniqueId + '/comments/' + e.target.dataset.commentid;
  $.ajax({
    method: 'DELETE',
    url: deleteCommentReqUrl,
    success: () => {
      window.location = window.location.href;
    },
    error: () => {
      console.log('Error deleting comment');
    }
  })
}


const handlePostNewCommentButton = (e) => {
  console.log(e);
  console.log(e.target.dataset.techniqueid);
  let currentPath = e.view.window.location.pathname;
  let comment = document.getElementsByClassName('addCommentTextarea')[0].value;
  let userNameForComment = document.getElementsByClassName('userUsernameInput')[0].id.split('-')[1];
  let userIdForComment = document.getElementsByClassName('userObjectIdInput')[0].id.split('-')[1];
  let url = '/api/v1/techniques/' + e.target.dataset.techniqueid;
  let currentDate = getCurrentDate();
  $.ajax({
    method: 'POST',
    url: url,
    data: {
      comment: comment,
      userName: userNameForComment,
      userId: userIdForComment,
      date: currentDate
    },
    success: (json) => {
      document.getElementsByClassName('addCommentTextarea')[0].value = "";
      window.location = window.location.href;
    },
    error: () => {
      console.log("ajax post comment error");
    }
  })
}

const handleSubmitNewTechniqueButton = (e) => {
  let shortDescription = document.getElementsByClassName('newTechniqueShortDescriptionInput')[0].value;
  let detailedDescription = document.getElementsByClassName('newTechniqueDetailedDescriptionInput')[0].value;
  let userId = document.getElementsByClassName('userObjectIdInput')[0].id.split('-')[1];
  let userUsername = document.getElementsByClassName('userUsernameInput')[0].id.split('-')[1];
  let url = '/api/v1/disorders/' + e.target.dataset.disorderId + '/techniques';
  let currentPath = e.view.window.location.pathname;
  $.ajax({
    method: "POST",
    url: url,
    data: {
      shortDescription: shortDescription,
      detailedDescription: detailedDescription,
      authorId: userId,
      authorUsername: userUsername
    },
    success: (json) => {
      window.location = window.location.href;
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
html.push(('<a href="/disorders/' + json[0]._id + '/techniques/' + json[1]._id + '>' + json[1].shortDescription + '</a>'));
html.push('<p>' + json[1].detailedDescription + '</p>');
html.push('<button class="deleteTechniqueButton" data-disorderId="' + json[0]._id + " data-techniqueId=" + json[1]._id + '>Delete Technique</button>');
  return html;
}
