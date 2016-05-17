function trans_shift()
{
	//한글만 변환됨
	//영어나 숫자 변환도 추가해야 할까?
	//근데 영어나 숫자는 쉬프트키 눌려도 멀쩡하게 쓸 수 있으니(caps lock도 있고 숫자패드도 있고) 추가할 필요 없을 것 같다...

	var txt, len;
	var res = '';

	txt = document.Form.Text.value;
	len = txt.length;

	document.Form.reset();

	for(var i = 0; i < len; i++)
	{

		var unicode = txt.charCodeAt(i);
		var word1, word2 = '', word3 = '';

		if(unicode >= 44032 && unicode <= 55203) //조합된 글자일 때
		{
			unicode -= 44032;
			var cho = Math.floor(unicode / 588);
			var jung = Math.floor(unicode % 588 / 28);
			var jong = Math.floor(unicode % 28);

			var num2 = -1, num3 = -1;

			//초성
			if(cho == 0) cho = 1; //ㄱ
			else if(cho == 3) cho = 4; //ㄷ
			else if(cho == 7) cho = 8; //ㅂ
			else if(cho == 9) cho = 10; //ㅅ
			else if(cho == 12) cho = 13; //ㅈ

			//중성
			if(jung == 1) jung = 3; //ㅐ
			else if(jung == 5) jung = 7; //ㅔ
			else if(jung == 10) { jung = 8; num2 = 3 + 12623; } //ㅙ
			else if(jung == 15) { jung = 13; num2 = 7 + 12623; }//ㅞ

			//종성
			if(jong == 1) jong = 2; //ㄱ
			else if(jong == 3) { jong = 2; num2 = 21 + 12593; } //ㄳ
			else if(jong == 5) { jong = 4; num2 = 24 + 12593; } //ㄵ
			else if(jong == 7) { jong = 0; num2 = 7 + 12593; } //ㄷ
			else if(jong == 9) { jong = 8; num2 = 1 + 12593; } //ㄺ
			else if(jong == 11) { jong = 8; num2 = 18 + 12593; } //ㄼ
			else if(jong == 12) { jong = 8; num2 = 21 + 12593; } //ㄽ
			else if(jong == 17) { jong = 0; num2 = 18 + 12593; } //ㅂ
			else if(jong == 18) { jong = 0; num2 = 18 + 12593; num3 = 21 + 12593;} //ㅄ
			else if(jong == 19) { jong = 20; } //ㅅ
			else if(jong == 22) { jong = 0; num2 = 24 + 23593; } //ㅈ

			word1 = String.fromCharCode(cho * 588 + jung * 28 + jong * 1 + 44032);
			if(num2 != -1) word2 = String.fromCharCode(num2);
			if(num3 != -1) word3 = String.fromCharCode(num3);
		}

		else if(unicode >= 12593 && unicode <= 12622) //조합되지 않은 자음일 때 : ㄱ 같은
		{
			var num1 = unicode - 12593;
			var num2 = -1;

			if(num1 == 0) { num1 = 1; } //ㄱ
			else if(num1 == 2) { num1 = 1; num2 = 21; }//ㄳ
			else if(num1 == 4) { num1 = 3; num2 = 24; } //ㄵ
			else if(num1 == 6) { num1 = 7; } //ㄷ
			else if(num1 == 9) { num1 = 8; num2 = 1; } //ㄺ
			else if(num1 == 11) { num1 = 8; num2 = 18; } //ㄼ
			else if(num1 == 12) { num1 = 8; num2 = 21; } //ㄽ
			else if(num1 == 17) { num1 = 18; } //ㅂ
			else if(num1 == 19) { num1 = 18; num2 = 21; } //ㅄ
			else if(num1 == 20) { num1 = 21; } //ㅅ
			else if(num1 == 23) { num1 = 24; } //ㅈ

			word1 = String.fromCharCode(num1 + 12593);
			if(num2 != -1) word2 = String.fromCharCode(num2 + 12593);
		}

		else if(unicode >= 12623 && unicode <= 12643) //조합되지 않은 모음일 때
		{
			var num1 = unicode - 12623;
			var num2 = -1;

			if(word1 == 1) word1 = 3; //ㅐ
			else if(word1 == 5) word1 = 7; //ㅔ
			else if(word1 == 10) {word1 = 8; word2 = 3;} //ㅙ
			else if(word1 == 15) {word1 = 13; word2 = 7;} //ㅞ

			word1 = String.fromCharCode(num1 + 12623);
			if(num2 != -1) word2 = String.fromCharCode(num2 + 12593);
		}

		else
		{
			word1 = txt[i];
		}

		res += word1 + word2 + word3;
	}

	document.getElementById('TheEnd').innerHTML = res;

	return;
}