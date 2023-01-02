import { SelectButton } from "primereact/selectbutton"

const options = [
	{ icon: 'pi pi-user', option: 1 },
	{ icon: 'pi pi-bookmark', option: 2 },
	{ icon: 'pi pi-star', option: 3 },
	{ icon: 'pi pi-search', option: 4 }
];

const justifyTemplate = (option) => {
	return <i className={option.icon}></i>;
}

export const MovileHeader = ({ isPC, setOption, option}) => {
	return !isPC && <SelectButton value={option} options={options} onChange={(e) => setOption(e.option)} itemTemplate={justifyTemplate} />
}
