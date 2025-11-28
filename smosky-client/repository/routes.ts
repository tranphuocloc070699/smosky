const prefix = '/api'
const auth = '/authorization/auth'
const boilerplatesPrefix =  '/boilerplates'

const Routes = {
    BOILERPLATE: {
        SPRING:`${prefix}${boilerplatesPrefix}/spring`
    },
    POST:`${prefix}/posts`,
    REVIEW:`${prefix}/reviews`,
    ADMIN:`${prefix}/admin`,
    AUTH:{
        LOGIN:`${auth}/login`,
        SIGNUP:`${auth}/signup`,
        authenticate:`${prefix}${auth}/authenticate`
    }
}

export default Routes