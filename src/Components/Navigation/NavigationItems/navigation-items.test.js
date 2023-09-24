import {configure, shallow} from "enzyme";
import Adapter from '@cfaester/enzyme-adapter-react-18'
import NavigationItems from "./navigation-items";
import NavigationItem from "./NavigationItem/navigation-item";

configure({adapter: new Adapter()});

describe('testing <NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    })
    it('should render 3 navigationItems', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should render 3 navigationItems when authenticated', () => {
        wrapper.setProps({isAuth: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should find 3 navigationItems when authenticated', () => {
        wrapper.setProps({isAuth: true})
        expect(wrapper.contains(<NavigationItem link='/logout'>Log Out</NavigationItem>)).toEqual(true);
    });
})