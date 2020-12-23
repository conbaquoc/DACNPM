import React, {Component, lazy, Suspense} from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import i18n from 'i18next';
import { flatMap, map } from 'lodash';
import ModalRoute from '../ModalRoute';
import Loading from '../../components/common/LoadingScreen';
import PrivateLayout from '../../layout/PrivateLayout';
import Dashboard from '../../pages/Dashboard';
// import DetailTransaction from '../../pages/DetailTransaction'

const routes = [
  {
    path: '/',
    component: Dashboard,
    exact: true,
    title: i18n.t('dashboard.title'),
  },
  {
    path: '/post',
    component: lazy(() => import('../../pages/Class/List')),
    exact: true,
    title: "Danh sách lớp học",
    routes: [
      {
        path: '/',
        component: lazy(() => import('../../pages/Class/List')),
        exact: true,
        title: "Danh sách lớp học",
      },
      
    ]
  },
  {
    path: '/options',
    component: lazy(() => import('../../containers/Place/index')),
    exact: true,
    title: "Danh sách lớp học",
    routes: [
      {
        path: '/',
        component: lazy(() => import('../../containers/Place/index')),
        exact: true,
        title: "Danh sách lớp học",
      },
      
    ]
  },
  {
    path: '/post/createpost',
    component: lazy(() => import('../../containers/Class/List/createpost')),
    exact: true,
    title: "Danh sách lớp học",
    routes: [
      {
        path: '/',
        component: lazy(() => import('../../containers/Class/List/createpost')),
        exact: true,
        title: "Danh sách lớp học",
      },
      
    ]
  },
  {
    path: '/city',
    component: lazy(() => import('../../containers/Place/city')),
    exact: true,
    title: "Danh sách lớp học",
    routes: [
      {
        path: '/',
        component: lazy(() => import('../../containers/Place/city')),
        exact: true,
        title: "Danh sách lớp học",
      },
      
    ]
  },

  {
    path: '/district',
    component: lazy(() => import('../../containers/Place/district')),
    exact: true,
    title: "Danh sách lớp học",
    routes: [
      {
        path: '/',
        component: lazy(() => import('../../containers/Place/district')),
        exact: true,
        title: "Danh sách lớp học",
      },
      
    ]
  },

  {
    path: '/district/createdistrict',
    component: lazy(() => import('../../containers/Place/createdistrict')),
    exact: true,
    title: "Danh sách lớp học",
    routes: [
      {
        path: '/',
        component: lazy(() => import('../../containers/Place/createdistrict')),
        exact: true,
        title: "Danh sách lớp học",
      },
      
    ]
  },

  {
    path: '/city/createcity',
    component: lazy(() => import('../../containers/Place/createcity')),
    exact: true,
    title: "Danh sách lớp học",
    routes: [
      {
        path: '/',
        component: lazy(() => import('../../containers/Place/createcity')),
        exact: true,
        title: "Danh sách lớp học",
      },
      
    ]
  },

  {
    path: '/post/finpost',
    component: lazy(() => import('../../containers/Class/List/finpost')),
    exact: true,
    
    routes: [
      {
        path: '/',
        component: lazy(() => import('../../containers/Class/List/finpost')),
        exact: true,
        
      },
      
    ]
  },
  {
    path: '/post/regis',
    component: lazy(() => import('../../pages/Class/Regis')),
    exact: true,
    title: "Danh sách đăng kí hiến máu",
    routes: [
      {
        path: '/',
        component: lazy(() => import('../../pages/Class/Regis')),
        exact: true,
        title: "Danh sách đăng kí hiến máu",
      },
      
    ]
  },
  {
    path: '/post/qrcode',
    component: lazy(() => import('../../pages/Class/qrcode/qrcode')),
    exact: true,
    title: "QRCode",
    routes: [
      {
        path: '/',
        component: lazy(() => import('../../pages/Class/qrcode/qrcode')),
        exact: true,
        title: "QRCode",
      },
      
    ]
  },

  // {
  //   path: '/properties',
  //   component: lazy(() => import('../../pages/Property/List')),
  //   exact: true,
  //   title: i18n.t('property.title'),
  //   routes: [
  //     {
  //       path: '/',
  //       component: lazy(() => import('../../pages/Property/List')),
  //       exact: true,
  //       title: i18n.t('property.title'),
  //     },
  //     {
  //       path: '/create',
  //       component:lazy(() => import('../../pages/Property/Create')),
  //       exact: true,
  //       title: i18n.t('property.title'),
  //     },
  //     {
  //       path: '/:id/edit',
  //       component:lazy(() => import('../../pages/Property/Edit')),
  //       exact: true,
  //       title: i18n.t('property.title'),
  //     },
  //   ],
  // },
  
];

class PrivateRoutes extends Component {

  render() {
    return (
      <Switch>
        {map(
          flatMap(routes, route => {
            if (route.routes) {
              return map(route.routes, subRoute => ({
                ...subRoute,
                path: route.path + subRoute.path,
                exact: subRoute.path === '/',
              }));
            }
            return route;
          }),
          route => (
            <Route
              {...route}
              component={e => {
                // console.log(e);

                return(
                  <PrivateLayout>
                    <Suspense fallback={<Loading />}>
                      <route.component {...e} />
                    </Suspense>
                    <ModalRoute location={e.location} match={e.match} />
                  </PrivateLayout>
                )}}
              key={route.path}
            />
          ),
        )}
      </Switch>
    );
  }
}

PrivateRoutes.propTypes = {};

export default connect(state => ({
  isAuthenticated: state.staff.isAuthenticated,
}))(PrivateRoutes);
