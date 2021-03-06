var urlParameters = require('../../../js/third-party/url-parameters.js');

const SHA256 = require('crypto-js/sha256');
const Hex = require('crypto-js/enc-hex');
const Passwords = require('./passwords.js');

// List indices:
// [name, the password or encryption , salt, [encryption with salt]]
const NAME = 0;
const HASH = 1;
const SALT = 2;
const HASHWITHSALT = 3;

var isSalted;
var allPasswords = [];

$(document).ready(function() {
  isSalted = !(urlParameters.getUrlParameter('salted') == "false"); // Default should be true
  if (isSalted) {
    $('#salt-header').removeClass('d-none');
    $('#salt-input').removeClass('d-none');
  }
  $('#pg-password-salt').val('');
  $('#pg-password-guess').val('');

  setUpTable();

  $('#pg-submit-button').click(checkGuess);

  $('.pg-img').click(function() {
    var salt = $(this).parent().html().trim().substring(0, 16); // Get the 16 character salt
    $('#pg-password-salt').val(salt);
  })
});

/**
 * Sets up the table for password guessing
 */
function setUpTable() {
  hashLanguagePasswords();

  var i = 0;
  var j = 0;
  var x = Passwords.LanguagePasswords.length;
  while (i < x) {
    addToTable(Passwords.LanguagePasswords[i], j);
    i++;
    j++;
  }
  i = 0;
  x = Passwords.WordPasswords.length;
  while (i < x) {
    addToTable(Passwords.WordPasswords[i], j);
    i++;
    j++;
  }
}

/**
 * Applies the hash function to the language-specific passwords,
 * the non-language specific ones are hashed in advance
 */
function hashLanguagePasswords() {
  var password;
  var hashWithSalt;
  var hashNoSalt;
  for (var i=0; i < Passwords.LanguagePasswords.length; i++) {
    password = Passwords.LanguagePasswords[i];
    hashWithSalt = SHA256(password[HASH] + password[SALT]).toString(Hex).toUpperCase();
    hashNoSalt = SHA256(password[HASH]).toString(Hex).toUpperCase();
    Passwords.LanguagePasswords[i] = [password[NAME], hashNoSalt, password[SALT], hashWithSalt];
  }
}

/**
 * Adds the given password hash (at indexth row) to the table
 */
function addToTable(password, index) {
  var $table = $('#password-table');
  var html =  '<tr id="row-' + index + '">\n' +
              '  <td>\n' +
              '    ' + password[NAME] + '\n' +
              '  </td>\n';
  if (isSalted) {
    html +=   '  <td class="salt">\n' +
              '    ' + password[SALT] + '\n' +
              '    <img class="pg-img" src="https://img.icons8.com/material-rounded/24/000000/copy.png">\n' +
              '  </td>\n';
  }
  html +=     '  <td class="hash">\n' +
              '    ' + (isSalted ? password[HASHWITHSALT] : password[HASH]) + '\n' +
              '  </td>\n' +
              '</tr>\n';
  
  allPasswords.push(password);
  $table.append(html);
}

/**
 * Concatenates the guessed password with the given salt (if applicable),
 * hashes the result, and checks it against hashed passwords in the table.
 * 
 * The salt is interpreted as a string
 */
function checkGuess() {
  unhighlight('#pg-calculated-hash');
  dehighlight();

  var guess = $('#pg-password-guess').val().replace(/\s/g, '');
  var salt;
  var hash;
  if (isSalted) {
    salt = $('#pg-password-salt').val().replace(/\s/g, '');
    hash = SHA256(guess + salt).toString(Hex).toUpperCase();
  } else {
    hash = SHA256(guess).toString(Hex).toUpperCase();
  }
  $('#pg-calculated-hash').html(hash);

  var row;
  var password;
  for (var i=0; i < allPasswords.length; i++) {
    password = allPasswords[i];
    row = '#row-' + i;
    if ((isSalted && password[HASHWITHSALT] == hash) || (!isSalted && password[HASH] == hash)) {
      highlight('#pg-calculated-hash');
      highlight(row);
    }
  }
}

/**
 * Adds the css 'highlight' class to the given HTML element
 */
function highlight(element) {
  $(element).addClass('highlight');
}

/**
 * Removes the css 'highlight' class from the given HTML element
 */
function unhighlight(element) {
  $(element).removeClass('highlight');
}

/**
 * Replaces elements with the css 'highlight' class with the 'solved' one,
 * to indicate it is a password guessed previously
 */
function dehighlight() {
  $('.highlight').removeClass('highlight').addClass('solved');
}
