import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../desktop/Admin/pages/dashboard/Dashboard'
import SensorManagement from  '../desktop/Admin/pages/mangaesensor/Sensor'
import LoRaWANGateway from  '../desktop/Admin/pages/gateway/LorawanGateway'
import MQTTBroker from  '../desktop/Admin/pages/mqttconfig/MQTTConfig'
import Alerts from  '../desktop/Admin/pages/alerts/Alerts'
import DataManage from  '../desktop/Admin/pages/managedata/DataManage'
import User from  '../desktop/Admin/pages/users/User'
import SiteManage from  '../desktop/Admin/pages/sites/SiteManage'
import LicenseManagement from  '../desktop/Admin/pages/license/LicenseManagement'
import BackupStore from  '../desktop/Admin/pages/BackupStore'
import Reports from  '../desktop/Admin/pages/reports/Reports'
import Settings from  '../desktop/Admin/pages/Settings'
import DashboardUser from '../desktop/Users/userpages/dashboarduser/DashboardUser'
import ManageSensor from '../desktop/Users/userpages/sensor/ManageSensor'
import DashboardCustomize from '../desktop/Users/userpages/dashboardcustomize/DashboardCustomize'
import AlertsAndNotifications from '../desktop/Users/userpages/alertuser/AlertsConfig'
import SubscriptionPage from '../desktop/Users/userpages/Subscription'
import SiteMapping from '../desktop/Users/userpages/Sites'
import ReportsManage from '../desktop/Users/userpages/report/ReportsManage'
import SupportPage from '../desktop/Users/userpages/Support'
import DetailsPage from '../desktop/Users/userpages/Dashboard2'




const MainRoute = () => {
  return (
    <>
    
    
    <Routes>


<Route     path='/' element={<Dashboard/>}        />
<Route     path='/manage_sensor' element={<SensorManagement/>}        />
<Route     path='/manage_lorawan_gateway' element={<LoRaWANGateway/>}        />
<Route     path='/manage_mqtt' element={<MQTTBroker/>}        />
{/* <Route     path='/dashboard_customization' element={<DashboardCustomization/>}        /> */}
<Route     path='/manage_alerts' element={<Alerts/>}        />
<Route     path='/manage_data' element={<DataManage/>}        />
<Route     path='/manage_users' element={<User/>}        />
<Route     path='/manage_sites' element={<SiteManage/>}        />
<Route     path='/manage_license' element={<LicenseManagement/>}        />
<Route     path='/manage_backup' element={<BackupStore/>}        />
<Route     path='/manage_reports' element={<Reports/>}        />
<Route     path='/manage_setting' element={<Settings/>}        />

{/* user routes */}


<Route     path='/user' element={<DashboardUser/>}        />
<Route     path='/user_manage_sensor' element={<ManageSensor/>}        />
<Route     path='/user_manage_lorawan_gateway' element={<LoRaWANGateway/>}        />
<Route     path='/user_manage_mqtt' element={<MQTTBroker/>}        />
<Route     path='/user_dashboard_customization' element={<DashboardCustomize/>}        />
<Route     path='/user_manage_alerts' element={<AlertsAndNotifications/>}        />
<Route     path='/user_manage_data' element={<DataManage/>}        />
<Route     path='/user_manage_subscription' element={<SubscriptionPage/>}        />
<Route     path='/user_manage_sites' element={<SiteMapping/>}        />
{/* <Route     path='/user_manage_license' element={<LicenseManagement/>}        /> */}
<Route     path='/user_support' element={<SupportPage/>}        />
<Route     path='/user_manage_reports' element={<ReportsManage/>}        />
<Route     path='/user_manage_setting' element={<Settings/>}        />
<Route     path='/user_details/:label' element={<DetailsPage/>}        />




    </Routes>
    
    
    
    
    
    
    
    </>
  )
}

export default MainRoute