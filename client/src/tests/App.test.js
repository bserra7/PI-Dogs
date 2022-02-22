import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "../App";

import LandingPage from "../components/LandingPage";
import Dogs from '../components/Dogs';
import NavBar from '../components/NavBar';
import NewDog from '../components/NewDog';
import DogDetail from '../components/DogDetail';
import About from '../components/About';

configure({ adapter: new Adapter() });

describe('Componente App', () => {
  let store;
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore({
      dogBreeds: [],
      temperaments: [],
      dogsRaw: [],
      dogDetail: {},
      postResponse: '',
      error: '',
  });
  });

  describe('Render de Componentes', () => {
    it('Solamente el componente LandingPage debe renderizarse la ruta "/". Ningun otro componente debe renderizarse', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(LandingPage)).toHaveLength(1);
      expect(wrapper.find(NavBar)).toHaveLength(0);
      expect(wrapper.find(NewDog)).toHaveLength(0);
      expect(wrapper.find(Dogs)).toHaveLength(0);
      expect(wrapper.find(About)).toHaveLength(0); 
      expect(wrapper.find(DogDetail)).toHaveLength(0);
    });
    it('Debería renderizarse el Componente NavBar en cualquier otra ruta "/cualquierRuta"', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/cualquierRuta"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(NavBar)).toHaveLength(1);
    });

    it('En la ruta /dog/:idDog solo debe renderizar el Componente NavBar y el Componente DogDetail', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/dog/:idDog"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(NavBar)).toHaveLength(1);
      expect(wrapper.find(DogDetail)).toHaveLength(1);
      expect(wrapper.find(NewDog)).toHaveLength(0);
      expect(wrapper.find(Dogs)).toHaveLength(0);
      expect(wrapper.find(About)).toHaveLength(0); 
      expect(wrapper.find(LandingPage)).toHaveLength(0);
    });

    it('En la ruta /new-dog solo debe renderizar el Componente NavBar y el Componente NewDog', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/new-dog"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
        
      expect(wrapper.find(NavBar)).toHaveLength(1);
      expect(wrapper.find(NewDog)).toHaveLength(1);
      expect(wrapper.find(About)).toHaveLength(0); 
      expect(wrapper.find(Dogs)).toHaveLength(0);
      expect(wrapper.find(DogDetail)).toHaveLength(0);
      expect(wrapper.find(LandingPage)).toHaveLength(0);
    });

    it('En la ruta /about solo debe renderizar el Componente NavBar y el Componente About', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/about"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
        
      expect(wrapper.find(NavBar)).toHaveLength(1);
      expect(wrapper.find(About)).toHaveLength(1); 
      expect(wrapper.find(NewDog)).toHaveLength(0);
      expect(wrapper.find(Dogs)).toHaveLength(0);
      expect(wrapper.find(DogDetail)).toHaveLength(0);
      expect(wrapper.find(LandingPage)).toHaveLength(0);
    });
  });
})
