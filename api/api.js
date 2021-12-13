import base from "./base";
import url from "./url";

export default {
	//获取天气
	getWeather (params) {
		return base.request(url.WEATHER_HOST, params, "get");
	},
	
}