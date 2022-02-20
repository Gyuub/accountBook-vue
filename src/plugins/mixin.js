let mixin = {
    props: {
        weight:{
            default: 10
        }
    },
    created() {
        console.log('mixin')
    },
    methods:{
        clone: function(obj) {
		if (obj === null || typeof(obj) !== 'object'){
			return obj;
		}
		var copy = obj.constructor();
		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) {
				copy[attr] = obj[attr];
			}
		}
		return copy;
		},
		/**
		 * 날짜 '-' 붙이기
		 * @param value
		 * @returns
		 */
		createDatebar: function (obj) {
			return obj.substring(0, 4) + '-' + obj.substring(4, 6) + '-'
					+ obj.substring(6, 8);
		},
		/**
		 * 한글, 영문, 숫자, 특문(소수점제외) 제거 정규식
		 * @param value
		 * @param typeObj
		 * @returns
		 */
		isRegex: function(value, typeObj ){
			var arr = typeObj.split(",");
			var str = String(value);
			
			if(str){
				arr.forEach(function(ref){
					//영문 제거
					if(ref === "E") {
						str = str.replace(/[a-zA-Z]/g, '');
					}
					//한글 제거
					if(ref === "K"){
						str = str.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
					}
					//특문 제거
					if(ref === "S"){
						str = str.replace(/[~!@#$%`^&*()'"/\-,\s_+|<>?:{}]/g, '');
					}
					//숫자만
					if(ref === "N"){
						str = str.replace(/[^0-9]/g, ""); 
					}
				});
			}
			return str;    
		},

		dateDiff: function(date1, date2){
			date1= this.createDatebar(this.isRegex(date1,'N'))
			date2= this.createDatebar(this.isRegex(date2,'N'))
			var dateArray1 = date1.split("-"); 
			var dateObj1 = new Date(dateArray1[0], Number(dateArray1[1])-1, dateArray1[2]);
		
			var dateArray2 = date2.split("-"); 
			var dateObj2 = new Date(dateArray2[0], Number(dateArray2[1])-1, dateArray2[2]);
		
			return (dateObj1.getTime() - dateObj2.getTime())/1000/60/60/24;  
		},
		convertDateToYYYY:function (data){
			return data.getFullYear();
		},
		
		convertDateToMM: function (data){
			var mm = data.getMonth()+1;
			if(mm<10) {
				mm='0'+mm
			}
			return mm;
		},
		convertDateToDD: function(data){
			var dd = data.getDate();
			if(dd<10) {
				dd='0'+dd
			}
			return dd;
		},
		getTest : function(a){
			console.log("a:"+a)
		},


	}
};
export default mixin;