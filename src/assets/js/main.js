var progressBarPos = 0;
var chooseButtons1 = document.getElementsByClassName('tab1--selection-item-select');
var chooseButtons2 = document.getElementsByClassName('tab2--selection-item-select');
var chooseButtons3 = document.getElementsByClassName('tab3--selection-item');
var titleButtons = document.getElementsByClassName('tab4--form-select-option');
var inputs = document.getElementById('tab4--form-container').getElementsByTagName('input');
var currentTab = 0;
var confirmedData = [];
var tabs = document.getElementsByClassName('tab');

function moveProgressBar(count) {
  var bar = document.getElementById('main--progress-bar-filled');
  var animation = setInterval(frame, 20);
  var end = progressBarPos + count;
  function frame() {
    if (progressBarPos >= 100) {
        clearInterval(animation);
    } else if(progressBarPos == end) {
        clearInterval(animation);
    } else {
        progressBarPos += 0.5;
        bar.style.width = progressBarPos + '%';
    }
  }
}

function changeTab(step) {
  tabs[currentTab].style.display = 'none';
  currentTab += step;
  tabs[currentTab].style.display = 'block';
  if(currentTab < 0) {
    moveProgressBar(-19,5);
  } else {
    moveProgressBar(19,5);
  }
}

function validateForm() {
  for(var i = 0; i < inputs.length; i++) {
    if(inputs[i].value !== "") {
      if(i == inputs.length - 1) {
        if(document.getElementById('tab4--form-name-show').innerHTML !== "Title") {
          console.log('show');
          return true;
        } else {
          console.log('hide wegen title');
        }
      } else {
        console.log('hide weil es nicht das letzte item ist');
      }
    } else {
      break;
      console.log('hide weil das item leer ist');
    }
  }
  return false;
}

if(window.addEventListener) {
    window.addEventListener('load',moveProgressBar(19,5),false); //W3C
    tabs[currentTab].style.display = 'block';
} else {
    window.attachEvent('onload',moveProgressBar(19,5)); //IE
    tabs[currentTab].style.display = 'block';
}

for(var i = 0; i < chooseButtons1.length; i++) {
  chooseButtons1[i].addEventListener('click', function(){
    var currentChooseButton = this;
    confirmedData.push(currentChooseButton.parentElement.parentElement.parentElement.id);
    changeTab(1);
  });
}

for(var i = 0; i < chooseButtons2.length; i++) {
  chooseButtons2[i].addEventListener('click', function(){
    var currentChooseButton = this;
    confirmedData.push(currentChooseButton.parentElement.parentElement.parentElement.id);
    changeTab(1);
  });
}

for(var i = 0; i < chooseButtons3.length; i++) {
  chooseButtons3[i].addEventListener('click', function(){

    if(this.classList.contains('active')) {
      this.classList.remove('active');
    } else {
      for(var x = 0; x < document.getElementsByClassName('active').length; x++) {
        document.getElementsByClassName('active')[x].classList.remove('active');
      }
      this.classList.add('active')
    }
    if(document.getElementsByClassName('active').length > 0) {
      document.getElementById('tab3--selection-select').style.visibility = 'visible';
    } else {
      document.getElementById('tab3--selection-select').style.visibility = 'hidden';
    }
  });
}

document.getElementById('tab3--selection-select').addEventListener('click', function() {
    if(document.getElementsByClassName('active').length == 1) {
      confirmedData.push(document.getElementsByClassName('active')[0].id);
      changeTab(1);
    }
});

document.getElementById('tab4--form-name-show').addEventListener('click', function() {
    this.parentElement.getElementsByClassName('tab4--form-select-horizontal')[0].classList.toggle('show');
});

for(var i = 0; i < titleButtons.length; i++) {
  titleButtons[i].addEventListener('click', function() {
    document.getElementById('tab4--form-name-show').innerHTML = this.innerHTML;
    this.parentElement.classList.toggle('show');
    validateForm();
  });
}

for(var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('keypress', function(){
    if(validateForm() == true) {
      document.getElementById('tab4--selection-select').style.visibility = 'visible';
    } else {
      document.getElementById('tab4--selection-select').style.visibility = 'hidden';
    }
  });
}

document.getElementById('tab4--selection-select').addEventListener('click', function() {
  var participant = [document.getElementById('tab4--form-name-show').innerHTML, document.getElementById('tab4--form-name').value, document.getElementById('tab4--form-email').value, document.getElementById('tab4--form-street').value,document.getElementById('tab4--form-state').value,document.getElementById('tab4--form-postcode').value,document.getElementById('tab4--form-participants').value];
  confirmedData.push(participant);
  changeTab(1);
  console.log(confirmedData);
});
