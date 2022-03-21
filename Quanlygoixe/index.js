const homNay = new Date();
const dd = homNay.getDate();
const mm = homNay.getMonth() + 1;
const yy = homNay.getFullYear();
const hh = homNay.getHours();
const min = homNay.getMinutes();
const hNay = mm +"/"+ dd +"/"+ yy;
const gio = hh+"h"+min+"p";

let list = '[]';
if(localStorage.getItem('list_xe') != null){
    list = localStorage.getItem('list_xe');
}
const oldList = JSON.parse(list);

function onlyChar(str) {
    return /^[a-zA-Z]+$/.test(str);
}

function validateBangso (maxe) {
    if (maxe.length != 10) {
        console.log("Bang so xe khong vuot qua 10 ky tu")
        return false;
    } else {
        const haisoDau = maxe.slice(0,2);
        const namkytuSau = maxe.slice(2,7);
        const cackytuCuoi = maxe.slice(7);
        if(isNaN(haisoDau) == false && isNaN(cackytuCuoi) == false && onlyChar(namkytuSau) == true && haisoDau >=50 && haisoDau <=59){
            return true;
        }
    }
}

function guiXe(maXe, hangXe) {
    if(validateBangso(maXe)){
        if(!hangXe) console.log("Nhap hang xe, theo thu tu: bang so xe, hang xe");
        if(maXe && hangXe){
            const findCode = oldList.find(({code}) => code === maXe);
            if(findCode != null){
                console.log("Ma xe da ton tai");
            } else {
                const newData = {
                    'code': maXe,
                    'hang_xe': hangXe,
                    'day_gui': hNay,
                    'gio_gui': gio,
                };
                oldList.push(newData);
                localStorage.setItem('list_xe', JSON.stringify(oldList));
                list = localStorage.getItem('list_xe');
                console.log("Gui xe: " + maXe + ", Ngay: " + hNay);
            }
        }
    } else {
        console.log("Bang so xe sai dinh dang tp.hcm")
    }
};

function traXe(maXe) {
    const findCode = oldList.find(({code}) => code === maXe);
    if(findCode != null){
        console.log("Tra xe ma: " + maXe +", Ngay: "+ findCode.day_gui + " " + findCode.gio_gui + ", Phi goi: " + tinhPhi(maXe) + " VND");
        const newList = oldList.filter(({code}) => code !== maXe);
        localStorage.setItem('list_xe', JSON.stringify(newList));
        list = localStorage.getItem('list_xe');
    } else {
        console.log("Ma xe khong co trong bai");
    }
};

function tinhPhi(maXe) {
    const findCode = oldList.find(({code}) => code === maXe);
    const codeDate = new Date(findCode.day_gui);
    const codeDd = codeDate.getDate();
    const codeMm = codeDate.getMonth() + 1;
    const codeYy = codeDate.getFullYear();

    if(homNay > codeDate){
        if(mm == codeMm && yy == codeYy){
            const dayGoi = parseInt(dd) - parseInt(codeDd);
            if(dayGoi >= 1){
                return dayGoi*20000;
            } else {
                return 5000;
            }
        }
    }
};

// guiXe("50abcde123", "honda");
// traXe("50abcde123");
