<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-s-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-chat-dot-round',
                    index: 'tabs',
                    title: '消息'
                },
                {
                    icon: 'el-icon-s-flag',
                    index: '100',
                    title: '推广管理',
                    subs: [
                        {
                            index: 'generalize',
                            title: '主页设置'
                        }
                    ]
                },
                {
                    icon: 'el-icon-menu',
                    index: '11',
                    title: '分类管理',
                    subs: [
                        {
                            index: 'goodstype',
                            title: '商品类目'
                        },
                    ]
                },
                {
                    icon: 'el-icon-shopping-bag-1',
                    index: '10',
                    title: '商品管理',
                    subs: [
                        {
                            index: 'allgoods',
                            title: '商品列表'
                        }
                    ]
                },
                {
                    icon: 'el-icon-s-custom',
                    index: '12',
                    title: '用户管理',
                    subs: [
                        {
                            index: 'member',
                            title: '会员管理'
                        },
                    ]
                },
                {
                    icon: 'el-icon-news',
                    index: '13',
                    title: '订单管理',
                    subs: [
                        {
                            index: 'order',
                            title: '订单列表'
                        },
                    ]
                },
                {
                    icon: 'el-icon-s-check',
                    index: '14',
                    title: '权限系统',
                    subs: [
                        {
                            index: 'permission',
                            title: '权限管理'
                        },
                    ]
                },
               /* {
                    icon: 'el-icon-lx-calendar',
                    index: '3',
                    title: '表单相关',
                    subs: [
                        {
                            index: 'form',
                            title: '基本表单'
                        },
                        {
                            index: '3-2',
                            title: '三级菜单',
                            subs: [
                                {
                                    index: 'editor',
                                    title: '富文本编辑器'
                                },
                                {
                                    index: 'markdown',
                                    title: 'markdown编辑器'
                                }
                            ]
                        },
                        {
                            index: 'upload',
                            title: '文件上传'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: 'icon',
                    title: '自定义图标'
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: 'charts',
                    title: 'schart图表'
                },
                {
                    icon: 'el-icon-rank',
                    index: '6',
                    title: '拖拽组件',
                    subs: [
                        {
                            index: 'drag',
                            title: '拖拽列表'
                        },
                        {
                            index: 'dialog',
                            title: '拖拽弹框'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-global',
                    index: 'i18n',
                    title: '国际化功能'
                },
                {
                    icon: 'el-icon-lx-warn',
                    index: '7',
                    title: '错误处理',
                    subs: [
                        {
                            index: 'permission',
                            title: '权限测试'
                        },
                        {
                            index: '404',
                            title: '404页面'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-redpacket_fill',
                    index: '/donate',
                    title: '支持作者'
                }*/
            ]
        };
    },
    computed: {
        onRoutes() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
                bus.$emit('collapse-content', msg);
            });
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
    /*选择的项背景变色*/
    .el-menu-item.is-active {
        background-color: #F0F0F0 !important;
        color: #08080A;
    }

.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
}
.sidebar > ul {
    height: 100%;
}
</style>
