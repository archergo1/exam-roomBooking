const orderInfoBtn = document.querySelector(".orderInfo-btn");


// ------------------------------------------------

let newAryDate = [];

function reGetDate() {
    let newTextDate = getDateValue.replace(" - ", ",");
    //套件取到的點擊兩天 更改他的中間顯示 
    newAryDate = newTextDate.split(','); //並把兩個字串拆分成陣列

    // console.log(newAryDate)
    calcPagePrice();

}

// func openPage()   在我點下去時 才會從date把日期放進來跑一輪輸出數字 呈現value


// ------------------------------------------------

let pagePriceAry = [];


function calcPagePrice() {


    let calcNum = 0;
    let calcHowMany = 0;

    let holidayNum = 0;
    let normalNum = 0;



    // 兩個間隔數天的陣列 分別賦值 給兩個變數
    let aa = newAryDate[0]
    let bb = newAryDate[1]


    pagePriceAry = getDateBetween(aa, bb) //列出中間間隔的每一天
    // console.log(pagePriceAry)

    pagePriceAry.pop();  //拿掉最後一天 不算住宿
    // let newswitchAry = pagePriceAry.replace("-", " ");

    // console.log(newswitchAry)

    pagePriceAry.forEach(function (item) {





        let a = item.replace(/-/g, " ");   // 正則去除 - 然後轉毫秒 算禮拜幾
        // console.log(a)
        
        // 要使用轉毫秒的話 不能有中間的槓槓 上面正則拿掉
        millisecond = Date.parse(a);

        // console.log(millisecond);

        dateCatch = new Date(millisecond);
        // 轉成標準時間

        totalPrice = dateCatch.getDay()

        // console.log(totalPrice);



        if (totalPrice == 5 || totalPrice == 6 || totalPrice == 0) {

            calcNum += roomData.holidayPrice;
            calcHowMany++;
            holidayNum++;

        } if (totalPrice == 1 || totalPrice == 2 || totalPrice == 3 || totalPrice == 4) {

            calcNum += roomData.normalDayPrice;
            calcHowMany++;
            normalNum++;
        }
    })

    console.log(calcNum);  // 總日
    console.log(calcHowMany);

    console.log(normalNum);
    console.log(holidayNum);



    // 這串是搞錯的(不能使用這個)

    // if (normalNum < holidayNum && normalNum == 0 ) {

    //     console.log(normalNum)
    //     holidayNum = holidayNum - 1
    // }
    // if (holidayNum < normalNum && holidayNum == 0) {

    //     console.log(holidayNum)
    //     normalNum = normalNum - 1
    // }

    // if (normalNum < holidayNum ) {

    //     console.log(normalNum)
    //     normalNum = normalNum
    // }
    // if (holidayNum < normalNum) {

    //     console.log(holidayNum)
    //     holidayNum = holidayNum
    // }

    // rea;
    // realTotal = (holidayNum * roomData.holidayPrice) + (normalNum * roomData.normalDayPrice)


    document.querySelector("#changePrice").textContent = toThousands(calcNum);
    document.querySelector("#changeOrderPrice").textContent = toThousands(calcNum);
    document.querySelector("#howManyNight").textContent = calcHowMany;  //幾晚


    document.querySelector("#totalday").textContent = calcHowMany + 1;  //總天數
    document.querySelector("#normalday").textContent = normalNum;
    document.querySelector("#holiday").textContent = holidayNum;

}





function toThousands(x) {
    let parts = x.toString().split("."); //轉為字串   然後.split("."); parts值會變為陣列內字串
    // console.log(parts);

    // split先分離小數點 整數用正則處理完千分位 再join加回來
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}





function validatePhone(phone) {
    if (/^[09]{2}\d{8}$/.test(phone)) {
        return true;
    }
    return false;
}