
Page({
	data: {
		searchVal: null,
	},
	onLoad: function (options) {

	},


	onSearch(e) {
		let that = this
		let searchVal = e.detail.value;
		that.setData({ searchVal: searchVal})
	},
	onCleanSearch() {
		this.setData({ searchVal: null })
	}
})