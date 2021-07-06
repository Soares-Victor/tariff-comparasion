import React from 'react';
import {useIntl} from 'react-intl';
import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu,} from 'react-pro-sidebar';
import {FaBookReader, FaGithub, FaList, FaTachometerAlt} from 'react-icons/fa';
import sidebarBg from './assets/bg1.jpg';
import {Link} from "react-router-dom";

const Aside = ({image, collapsed, rtl, toggled, handleToggleSidebar}) => {
    const intl = useIntl();
    return (
        <ProSidebar
            image={image ? sidebarBg : false}
            rtl={rtl}
            collapsed={collapsed}
            toggled={toggled}
            breakPoint="md"
            onToggle={handleToggleSidebar}
        >
            <SidebarHeader>
                <div
                    style={{
                        padding: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {intl.formatMessage({id: 'sidebarTitle'})}
                </div>
            </SidebarHeader>
            <SidebarContent>

                <Menu iconShape="circle">
                    <MenuItem icon={<FaTachometerAlt/>}>
                        <Link to={`${process.env.PUBLIC_URL}/home`}>
                            {intl.formatMessage({id: 'dashboard'})}
                        </Link>
                    </MenuItem>
                    <SubMenu
                        title={intl.formatMessage({id: 'tariffComparison'})} icon={<FaList/>}>
                        <SubMenu
                            title={intl.formatMessage({id: 'menuCosts'})} icon={<FaList/>}>
                            <MenuItem>
                                <Link to={`${process.env.PUBLIC_URL}/costs/calculate`}>
                                    {intl.formatMessage({id: 'submenuCostsCalculate'})}
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to={`${process.env.PUBLIC_URL}/costs/upload`}>
                                    {intl.formatMessage({id: 'submenuCostsFile'})}
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to={`${process.env.PUBLIC_URL}/costs/calculation/listall`}>
                                    {intl.formatMessage({id: 'submenuCostsListAllCalculation'})}
                                </Link>
                            </MenuItem>

                        </SubMenu>
                        <SubMenu
                            title={intl.formatMessage({id: 'menuProducts'})} icon={<FaList/>}>
                            <MenuItem>
                                <Link to={`${process.env.PUBLIC_URL}/product`}>
                                    {intl.formatMessage({id: 'submenuProductsManage'})}
                                </Link>
                            </MenuItem>
                        </SubMenu>

                    </SubMenu>
                    <MenuItem icon={<FaBookReader/>}>
                        <Link to={`${process.env.PUBLIC_URL}/about`}>
                            {intl.formatMessage({id: 'aboutMenu'})}
                        </Link>
                    </MenuItem>
                </Menu>
            </SidebarContent>

            <SidebarFooter style={{textAlign: 'center'}}>
                <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 24px',
                    }}>
                    <a
                        href="https://github.com/Soares-Victor"
                        target="_blank"
                        className="sidebar-btn"
                        rel="noopener noreferrer">
                        <FaGithub/>
                        <span> {intl.formatMessage({id: 'viewSource'})}</span>
                    </a>
                </div>
            </SidebarFooter>
        </ProSidebar>
    );
};

export default Aside;
