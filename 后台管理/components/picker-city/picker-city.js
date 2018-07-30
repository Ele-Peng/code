import Component from '../component'
import data from './data'

const format = (data) => {
	let result = []
	for(let i = 0; i < data.length; i++) {
		let d = data[i]
		if(d.name === "请选择") continue
		result.push(d.name)
	}
	if(result.length) return result
	return [""]
};

const format_code = (data) => {
  let result = []
  for (let i = 0; i < data.length; i++) {
    let d = data[i]
    if (d.name === "请选择") continue
    result.push(d.code)
  }
  if (result.length) return result
  return [""]
};

const sub = (data) => {
	if(!data.sub) return [""]
	return format(data.sub)
}

const sub_code = (data) => {
  if (!data.sub) return [""]
  return format_code(data.sub)
}

const getCities = (d) => {
	for(let i = 0; i < raw.length; i++) {
		if(raw[i].name === d) return sub(raw[i])
	}
	return [""]
}

const getCitieCodes = (d) => {
  for (let i = 0; i < raw.length; i++) {
    if (raw[i].name === d) return sub_code(raw[i])
  }
  return [""]
}

const getDistricts = (p, c) => {
	for(let i = 0; i < raw.length; i++) {
		if(raw[i].name === p) {
      console.log("print raw", raw[i])
      for (let j = 0; j < raw[i].sub.length; j++) {
        if (raw[i].sub[j].name === c) {
          return sub(raw[i].sub[j])
        }
      }
		}
	}
	return [""]
}

const getDistrictCodes = (p, c) => {
  for (let i = 0; i < raw.length; i++) {
    if (raw[i].name === p) {
      for (let j = 0; j < raw[i].sub.length; j++) {
        if (raw[i].sub[j].name === c) {
          return sub_code(raw[i].sub[j])
        }
      }
    }
  }
  return [""]
}

let raw = data
let provinces = raw.map(d => d.name)
let provinceCodes = raw.map(d => d.code)
let currentProvince = provinces[0]
let currentProvinceCode = provinceCodes[0]
let initCities = sub(raw[0])
let initCitieCodes = sub_code(raw[0])
let currentCity = initCities[0]
let currentCityCode = initCitieCodes[0]
let initDistricts = getDistricts(currentProvince, currentCity)
let initDistrictCodes = getDistrictCodes(currentProvince, currentCity)
let currentDistrict = initDistricts[0]
let currentDistrictCode = initDistrictCodes[0]

export default {
	/**
	 * 默认参数
	 */
	setDefaults() {
    console.log(provinceCodes)
    console.log(initCitieCodes)
    console.log(initDistrictCodes)
		return {
			title: `请选择`, 
			cols: [
				{
          values: provinceCodes,
          displayValues: provinces,
					className: `col-province`, 
				},
				{
          values: initCitieCodes,
          displayValues: initCities, 
					className: `col-city`, 
				},
				{
          values: initDistrictCodes,
          displayValues: initDistricts, 
					className: `col-district`, 
				}
			], 
			value: [], 
			toolbar: true, 
			toolbarCloseText: `完成`, 
			onChange() {}
		}
	},
	/**
	 * 缓存上一次滑动的位置
	 */
	temp: {},
	/**
	 * 渲染选择器组件
	 * @param {String} id   唯一标识
	 * @param {Object} opts 配置项
	 * @param {String} opts.title 提示标题
	 * @param {Array} opts.cols 选择器的数据
	 * @param {String} opts.cols.className 自定义每一列的类
	 * @param {Array} opts.cols.values 自定义每一列的数据
	 * @param {Array} opts.value 选择器的默认值
	 * @param {Boolean} opts.toolbar 是否显示工具栏
	 * @param {String} opts.toolbarCloseText 关闭按钮的文案
	 * @param {Function} opts.onChange 监听值变化的回调函数
	 */
	init(id, opts = {}) {
		const that = this
		const updateValue = (cols = [], arrValues = []) => {
      console.log("update value")
      console.log(cols)
      console.log(arrValues)
			let newValue = []
			let newValueIndex = []
			let newDisplayValues = []

			for (let i = 0; i < cols.length; i++) {
				if (cols[i]) {
					const values = cols[i].values || []
					const displayValues = cols[i].displayValues || []
					const valueIndex = arrValues[i]

					newValueIndex.push( typeof values[valueIndex] !== `undefined` ? valueIndex : 0)
					newValue.push( typeof values[valueIndex] !== `undefined` ? values[valueIndex] : values[0])
					newDisplayValues.push( typeof displayValues[valueIndex] !== `undefined` ? displayValues[valueIndex] : undefined)

				}
			}

			if (newValue.indexOf(undefined) >= 0) {
				return !1
			}

			return {
				value: newValue, 
				valueIndex: newValueIndex, 
				displayValues: newDisplayValues, 
			}
		}
		const temp = that.temp[id] = that.temp[id] ? that.temp[id] : {
			currentProvince, 
			currentCity, 
		}
		const options = Object.assign({}, this.setDefaults(), opts)

		options.value = updateValue(options.cols, options.value).valueIndex
		options.cols = temp && temp.cols || options.cols
		
		// 实例化组件
		const component = new Component({
			scope: `$wux.pickerCity.${id}`, 
			data: options, 
			methods: {
				/**
				 * 隐藏
				 */
				hide(e) {
					this.setHidden([`weui-animate-slide-down`, `weui-animate-fade-out`])
				},
				/**
				 * 显示
				 */
				show() {
					this.setVisible([`weui-animate-slide-up`, `weui-animate-fade-in`])
				},
				/**
				 * 当滚动选择，value 改变时触发 change 事件
				 */
				bindChange(e) {
					this.render(e.detail.value)
				},
				/**
				 * 更新组件
				 */
				updateValue: updateValue, 
				/**
				 * 渲染组件
				 */
				render(value = []) {
					const render = (cols, value) => {
            console.log("rendering", cols, value)
						const params = this.updateValue(cols, value)            
						this.setData({
							[`$wux.pickerCity.${id}.cols`]: cols, 
							[`$wux.pickerCity.${id}.value`]: params.valueIndex, 
						})
						typeof options.onChange === `function` && options.onChange(params)
					}

					let cols = this.getComponentData().cols
					let newProvince = cols[0].displayValues[value[0]]
					let newCity, isEnd = !1

					if(newProvince !== temp.currentProvince) {
						const newCities = getCities(newProvince)
						newCity = newCities[0]
						const newDistricts = getDistricts(newProvince, newCity)
            console.log("new districts", newDistricts)
            cols[1].values = getCitieCodes(newProvince)
            cols[1].displayValues = newCities
            cols[2].values = getDistrictCodes(newProvince, newCity)
            cols[2].displayValues = newDistricts
						temp.currentProvince = newProvince
						temp.currentCity = newCity
						isEnd = !0
            value[1] = 0
            value[2] = 0
					}

					const _newCity = cols[1].displayValues[value[1]]

					if(!isEnd && _newCity !== temp.currentCity) {
						newCity = _newCity
            console.log("newcity", newCity)
            console.log("new province", newProvince)
						const newDistricts = getDistricts(newProvince, newCity)
            console.log("new districts", newDistricts)
            cols[2].values = getDistrictCodes(newProvince, newCity)
            cols[2].displayValues = newDistricts
            console.log("new districts", cols[2].values, cols[2].displayValues)
						temp.currentCity = newCity
					}

					render(cols, value)

					temp.value = value
					temp.cols = cols
				},
			}
		})
		
    	component.show()
    	component.render(temp && temp.value || options.value)
	},
}