window.onload = function(){

    // Get html elements
    let clearTextArea = document.getElementById("clear");
    let encryptedTextArea = document.getElementById("encrypted");
    let offsetValueInput = document.getElementById("offsetValue");
  
    // init default values
    let offsetValue = 0;
    let clearText = "";
    let encryptedText = "";
  
    // start loop om te checken of er iets veranderd is (andere text, offset...) om de seconde
    let loop = setInterval(check, 1000);
  
    /* haalt de waarde van de offset en zet deze op null indien het geen nummer is */
    function setOffsetValue(){
      if( isNaN( parseInt(offsetValueInput.value) ) ){
        return 0;
      }
      return parseInt(offsetValueInput.value);
    }
    
  
    /* Checkt of de text veranderd is, zo ja dan stuurt die de text naar de encrypt functie */
    function check(){
      // Verwijdert accenten in de text, zie https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
      normalizedClearText = clearTextArea.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      if( clearText != normalizedClearText || offsetValue != setOffsetValue() ){
          offsetValue = setOffsetValue();
          clearText = normalizedClearText
          encryptedText = encrypt(clearText);
          encryptedTextArea.value = encryptedText;
      }
    }
  
  
      /*Er wordt voor elke letter van 'clearText gekeken wat de ASCII code is. Op basis van de offset verandert de ASCII waarde*/
    function encrypt(clearText){
      var result = "";
        //loopt door elk character van clearText
        for (var i = 0; i < clearText.length; i++) {
                
          //get the character code van elk character
         var charcode = clearText.charCodeAt(i);
  
         // handle uppercase letters
         if(charcode >= 65 && charcode <=  90) {
            result += String.fromCharCode((charcode - 65 + setOffsetValue()) % 26 + 65); 
  
         // handle lowercase letters
         }else if(charcode >= 97 && charcode <= 122){
             result += String.fromCharCode((charcode - 97 + setOffsetValue()) % 26 + 97);
  
         // Negeer het als het geen letter is
         }else {
             result += clearText.charAt(i);
         }
     }
      return result;
    }
  }
  