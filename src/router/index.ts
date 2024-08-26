/*
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-25 16:41:12
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-26 12:23:04
 * @FilePath: \vueAdmin\src\router\index.ts
 * @Description:
 *
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved.
 */
import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/index.vue'

const modules = import.meta.glob('../views/**/*.vue')
console.log('modules', modules)

const generateRoutes = (modulePaths: string[]) => {
    const routes: any[] = []
    // const usedNames = new Set<string>()

    const addRoute = (path: string) => {
        const routePath = path.replace(/^\.\.\/views\/(.*)\.vue$/, '$1')
        // console.log('routePath', routePath)
        // x 这个路由是自定义的，不需要动态生成
        if (routePath === 'x') {
            return
        }
        const parts = routePath.split('/')
        let currentRoutes = routes
        let fullPath = ''

        parts.forEach((part, index) => {
            const isLast = index === parts.length - 1
            const isFirst = index === 0
            fullPath += (isFirst ? '/' : '-') + part

            let name = fullPath.replace(/\//g, '__').replace(/^__/, '')
            // while (usedNames.has(name)) {
            //   name += '-' + Math.random().toString(36).substr(2, 5)
            // }
            // usedNames.add(name)

            const existingRoute = currentRoutes.find(
                (r) => r.path === (isFirst ? `/${part}` : part)
            )

            if (existingRoute) {
                if (isLast) {
                    existingRoute.component = modules[path]
                    existingRoute.name = name
                } else {
                    currentRoutes = existingRoute.children || (existingRoute.children = [])
                }
            } else {
                const newRoute = {
                    path: isFirst ? `/${part}` : part,
                    name: name,
                    component: isLast ? modules[path] : undefined,
                    children: isLast ? undefined : []
                }
                // 处理 index 路由
                if (part === 'index') {
                    newRoute.path = isFirst ? '/' : ''
                    newRoute.alias = isFirst ? '/index' : part
                }
                // 动态参数
                const dynamicSegments = newRoute.path.match(/\[([^\]]+)\]/)
                if (dynamicSegments) {
                    // console.log(1, dynamicSegments)
                    newRoute.path = `:${dynamicSegments[1]}`
                }
                currentRoutes.push(newRoute)
                if (!isLast) {
                    currentRoutes = newRoute.children!
                }
            }
        })
    }

    modulePaths.forEach(addRoute)
    return routes
}

// 自定义路由
const customRoutes = [
    {
        path: '/:x*',
        name: 'x',
        component: () => import('../views/x.vue')
        // beforeEnter: (to, from, next) => {
        //     next()
        // }
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/404.vue')
    }
]

const autoRoutes = generateRoutes(Object.keys(modules))
console.log('autoRoutes', autoRoutes)

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...customRoutes, ...autoRoutes]
    // routes: [
    //   {
    //     path: '/:x+',
    //     name: 'x',
    //     component: () => import('../views/x.vue')
    //   },
    //   {
    //     path: '/',
    //     name: 'home',
    //     component: HomeView
    //   },
    //   {
    //     path: '/about',
    //     name: 'about',
    //     // route level code-splitting
    //     // this generates a separate chunk (About.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import('../views/aaa.vue')
    //   },
    //   {
    //     path: '/login',
    //     name: 'login',
    //     component: () => import('../views/login.vue')
    //   }
    // ]
})

router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    if (['login', '404'].includes(to.name)) {
        next()
        return
    }
    await userStore
        .checkUserInfo()
        .then((status) => {
            if (!status) {
                next({ name: 'login' })
                return
            }
            // 这里检查权限, 不足的跳走
            // x 的, 由动态参数判断
            if (to.name === 'x') {
                if (!Array.isArray(to.params.x)) {
                    to.params.x = ['index']
                    // next()
                    // return
                }
                if (!userStore.checkAuth(to.params.x.join('-'))) {
                    next({ name: '404' })
                } else {
                    next()
                }
                return
            }
            // 其他路由, 由 name 判断
            if (!userStore.checkAuth(to.name)) {
                next({ name: '404' })
            } else {
                next()
            }
        })
        .catch((err) => {
            next({ name: 'login' })
        })
})

export default router
