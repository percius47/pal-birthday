import React, { useState } from "react";
import "./App.css";
import double from "./tenor.gif";
import happy from "./happy.gif";
import sad from "./sad.gif";

let date;
let newoutput = "";
const datesInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


const App = () => {

  const [output, setOutput] = useState("");
  const [Img, setImg]=useState("");
  const [showOut,setShowOut]=useState("none");
  function inputDateHandler(e) {
    if (date) {
      setImg("");
      setOutput(
      <div>
      <img style={{height:"10rem", width:"13rem",display:"block", marginLeft:"auto",marginRight:"auto", textAlign:"center",marginBottom:"1rem"}} src={double} alt="loading gif"></img>
      <h4><i>Dont rush me, I'm crunching numbers!!</i></h4>
      </div>
      );
      setTimeout(() => {
        checkPalindrome();
      }, 3000);
    } else {
     
      setOutput(<p>Please fill date field.</p>);
    }
  }

  function checkPalindrome() {
    const dateArray = date.split("-");
    const inputYear = dateArray[0];
    const inputMonth = dateArray[1];
    const inputDate = dateArray[2];
    let setFlag = checkAllCombi(inputYear, inputMonth, inputDate);
    if (setFlag) {
      newoutput = `Whoa!!! Your birthdate in format ${setFlag} is palindrome.`;
    } else {
      let [nextdate, diff] = findNextDate(inputDate, inputMonth, inputYear);
      newoutput = `Oops! Your birthdate is not palindrome. Nearest palindrome date is ${nextdate}. You missed it by ${diff} days.`;
    }
    if(setFlag)
    {
      setImg(<img src={happy} alt=""
      style={{height:"10rem", width:"13rem",display:"block", marginLeft:"auto",marginRight:"auto", textAlign:"center",marginBottom:"1rem"}}
      />);
    }
    else{
      setImg(<img src={sad} alt=""
      style={{height:"10rem", width:"13rem",display:"block", marginLeft:"auto",marginRight:"auto", textAlign:"center",marginBottom:"1rem"}}
      />)
    }
    
    setOutput(
      <p >
        {newoutput}
      </p>
    );
  }

  function checkAllCombi(yyyy, mm, dd) {
    //yyyymmdd format string
    const dateFormat1 = yyyy + mm + dd;

    //ddmmyyyy format string
    const dateFormat2 = dd + mm + yyyy;

    //mmddyy format string
    const dateFormat3 = mm + dd + yyyy.substring(2);

    //mddyyyy format string
    const dateFormat4 = Number(mm) + dd + yyyy;

    if (isPalindrome(dateFormat1)) {
      return `${yyyy}-${mm}-${dd}`;
    } else if (isPalindrome(dateFormat2)) {
      return `${dd}-${mm}-${yyyy}`;
    } else if (isPalindrome(dateFormat3)) {
      return `${mm}-${dd}-${yyyy.substring(2)}`;
    } else if (isPalindrome(dateFormat4)) {
      return `${Number(mm)}-${dd}-${yyyy}`;
    } else {
      return null;
    }
  }

  function isPalindrome(stringCheck) {
    const max = Math.floor(stringCheck.length / 2);
    for (let i = 0; i < max; i++) {
      if (stringCheck[i] !== stringCheck[stringCheck.length - 1 - i]) {
        return false;
      }
    }
    return true;
  }

  function findNextDate(date, month, year) {
    let ddNo1 = Number(date);
    let mmNo1 = Number(month);
    let yyNo1 = Number(year);
    let ddNo2 = Number(date);
    let mmNo2 = Number(month);
    let yyNo2 = Number(year);

    for (let i = 1; i > 0; i++) {
      //forward check
      ddNo1 = ddNo1 + 1;
      if (ddNo1 > Number(datesInMonth[mmNo1 - 1])) {
        ddNo1 = 1;
        mmNo1 = mmNo1 + 1;
        if (mmNo1 > 12) {
          mmNo1 = 1;
          yyNo1 = yyNo1 + 1;
        }
      }
      let yyString = yyNo1.toString();
      let mmString = mmNo1.toString();
      let ddString = ddNo1.toString();
      if (mmString.length === 1) {
        mmString = "0" + mmString;
      }
      if (ddString.length === 1) {
        ddString = "0" + ddString;
      }
      let setFlagNextDate = checkAllCombi(yyString, mmString, ddString);
      if (setFlagNextDate) {
        return [`${setFlagNextDate}`, i];
      }

      //backward check
      if (yyNo2 > 1) {
        ddNo2 = ddNo2 - 1;
        if (ddNo2 < 1) {
          mmNo2 = mmNo2 - 1;
          if (mmNo2 < 1) {
            mmNo2 = 12;
            yyNo2 = yyNo2 - 1;
            if (yyNo2 < 1) {
              break;
            }
            ddNo2 = datesInMonth[mmNo2 - 1];
          }
        }
        let yyString = yyNo2.toString();
        let mmString = mmNo2.toString();
        let ddString = ddNo2.toString();
        if (mmString.length === 1) {
          mmString = "0" + mmString;
        }
        if (ddString.length === 1) {
          ddString = "0" + ddString;
        }
        let setFlagNextDate = checkAllCombi(yyString, mmString, ddString);
        if (setFlagNextDate) {
          return [`${setFlagNextDate}`, i];
        }
      }
    }
  }

  return (
    <div className="App">
      <div className="head">
        <h1>Palindrome Birthdays!! 🥳</h1>
      </div>
      <section className="about">
        
        <h2>
          About
        </h2>
        <p style={{ fontSize: "1rem" }}>
          <strong>Enter your birthdate and we will tell you if your birthdate is a
          palindrome date or not.</strong>
          This app checks your birthdate in 4 formats{" "}
          <i>yyyy-mm-dd, dd-mm-yyyy, mm-dd-yy, m-dd-yyyy</i>
          <br /> e.g. if your birthdate is 01 Aug 1995, then app will check for
          19950801, 01081995, 080195, 8101995
        </p>
        <input
          onChange={(e) => {
            date = e.target.value;
          }}
         
          id="datePicker"
          type="date"
          max="9999-12-31"
          required
        />
        <button
          onClick={(e)=>{
            inputDateHandler(e);
            setShowOut("block");
          }
          
          }
         
          className="linkPrimary"
        >
          check
        </button>
        <div className="out"
      style={{display:`${showOut}`}}
        >{Img}{output}</div>
      </section>
 {/* Footer */}
 <div className="footer">
          <div className="links">
          <a className="linkedIn" href="https://linkedin.com/in/prashantworks47">LinkedIn</a>
          <a className="twitter" href="https://twitter.com/percius25">Twitter</a>
          <a className="twitter" href="https://github.com/percius47">Github</a>
          
           </div>
          <small> Copyright. 2021 </small> 
        </div>
      
          </div>
  );
};
export default App;
