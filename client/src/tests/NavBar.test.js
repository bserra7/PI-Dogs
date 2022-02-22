import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavBar from "../components/NavBar";

configure({ adapter: new Adapter() });

describe("<NavBar />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavBar />);
  });

  it("Deberia renderizar Cuatro <Link />", () => {
    expect(wrapper.find(Link)).toHaveLength(4);
  });
  it('El primer Link debe contener el una etiqueta <img/> con logo de la APP y cambiar la ruta hacia "/home".', () => {
    expect(wrapper.find(Link).at(0).prop("to")).toEqual("/home");
    expect(wrapper.find(Link).at(0).find('img'))
  });
  it('El segundo Link debe contener el texto "Home" y cambiar la ruta hacia "/home".', () => {
    expect(wrapper.find(Link).at(1).prop("to")).toEqual("/home");
    expect(wrapper.find(Link).at(1).text()).toEqual("Home");
  });
  it('El tercer Link debe contener el texto "About" y cambiar la ruta hacia "/about".', () => {
    expect(wrapper.find(Link).at(2).prop("to")).toEqual("/about");
    expect(wrapper.find(Link).at(2).text()).toEqual("About");
  });
  it('El cuarto Link debe contener el texto "+ Create Dog" y cambiar la ruta hacia "/new-dog"', () => {
    expect(wrapper.find(Link).at(3).prop("to")).toEqual("/new-dog");
    expect(wrapper.find(Link).at(3).text()).toEqual("+ Create Dog");
  });
});
