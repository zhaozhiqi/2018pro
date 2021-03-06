export default {
  route: {
    boosj: '播视网',
    boosjFlow: '播视网流量统计',
    boosjVideoFlow: '播视网视频流量统计',
    dashboard: '首页',
    introduction: '简述',
    documentation: '文档',
    guide: '引导页',
    permission: '权限测试页',
    pagePermission: '页面权限',
    directivePermission: '指令权限',
    icons: '图标',
    components: '组件',
    componentIndex: '介绍',
    tinymce: '富文本编辑器',
    markdown: 'Markdown',
    jsonEditor: 'JSON编辑器',
    dndList: '列表拖拽',
    splitPane: 'Splitpane',
    avatarUpload: '头像上传',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: '小组件',
    backToTop: '返回顶部',
    dragDialog: '拖拽 Dialog',
    dragKanban: '可拖拽看板',
    charts: '图表',
    keyboardChart: '键盘图表',
    lineChart: '折线图',
    mixChart: '混合图表',
    example: '综合实例',
    nested: '路由嵌套',
    bar: 'Bar',
    barProfile: 'Profile',
    barPosts: 'Posts',
    Table: 'Table',
    dynamicTable: '动态Table',
    dragTable: '拖拽Table',
    inlineEditTable: 'Table内编辑',
    complexTable: '综合Table',
    treeTable: '树形表格',
    customTreeTable: '自定义树表',
    tab: 'Tab',
    form: '表单',
    createArticle: '创建文章',
    editArticle: '编辑文章',
    articleList: '文章列表',
    errorPages: '错误页面',
    page401: '401',
    page404: '404',
    errorLog: '错误日志',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    exportZip: 'Export Zip',
    theme: '换肤',
    clipboardDemo: 'Clipboard',
    i18n: '国际化'
  },
  navbar: {
    logOut: '退出登录',
    dashboard: '首页',
    github: '项目地址',
    screenfull: '全屏',
    theme: '换肤'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    roles: '你的权限',
    switchRoles: '切换权限'
  },
  guide: {
    description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    keyWord: '关键词',
    WPH: 'WPH编号',
    title: '标题',
    goodTitle: '商品名称',
    goodMoney: '商品金额（元）',
    goodStock: '商品库存',
    goodSummary: '商品简介',
    goodclassify: '店铺分类',
    batchNumbers: '商品批号',
    batchNumbersAdd: '商品批号(多个请用,分隔)',
    classifyList: '分类',
    shelfState: '上架状态',
    retailPrice: '建议零售价（元）',
    brand: '品牌名称',
    manufacturerName: '厂商名称',
    specifications: '规格',
    unit: '单位',
    salesVolume: '销售数量',
    corporateLogo: '公司Logo',
    corporateName: '公司名称',
    corporateAddress: '公司地址',
    corporateCode: '组织代码编号',
    createTime: '创建时间',
    groupCreateTime: '开始时间',
    groupEndTime: '结束时间',
    filePath: '营业执照',
    productFilePath: '授权文件',
    mobile: '联系电话',
    salesAreaCode: '销售区域',
    corporateType: '入驻类型',
    audit: '审核',
    auditStatus: '审核状态',
    auditFailMsg: '审核不通过理由',
    image: '图片',
    describe: '描述',
    label: '名称',
    parentId: '父分类',
    displayDiagram: '展示图',
    auditingTime: '审核时间',
    auditingUserId: '审核人员',
    userId: '申请授权用户',
    classifyId: '分类ID',
    images: '主图列表',
    code: '条形码',
    goodCode: '店铺货号',
    detail: '商品详情',
    productDetail: '产品详情',
    name: '名称',
    subBrand: '子品牌',
    submitterId: '提交人',
    updateTime: '更新时间',
    authorizeAreaCode: '授权区域',
    authorizeStartTime: '授权开始时间',
    authorizeEndTime: '授权结束时间',
    authorizeFilePath: '授权文件文件路径',
    authorizeTimeRange: '授权时间',
    shopName: '店铺名字',
    shopInfo: '店铺信息',
    shopLogo: '店铺LOGO',
    shopId: '店铺ID',
    product: '产品信息',
    productName: '产品名称',
    productId: '产品ID',
    productClassify: '产品分类',
    balance: '余额',
    balanceMoney: '扣点金额',
    orderNo: '订单号',
    weight: '单重（g）',
    proDetail: '产品详情',
    caseLot: '份额',
    count: '数量',
    groupHeadThumb: '团长头像',
    groupMoney: '拼团价格（元）',
    groupNick: '团长昵称',
    groupCount: '拼团规模',
    shopGroupPurchaseId: '店铺拼团ID',
    restrictionsNumber: '单人限购数量',
    groupCaseLot: '份数',
    caseExpiryDate: '有效时间（小时）',
    numberOfParticipants: '参与人数',
    shopGoodsId: '店铺商品ID',
    surplusCaseLot: '剩余份额 ',
    consigneeName: '收货人',
    consigneeAddress: '收货地址',
    consigneeMobile: '收货人联系电话',
    confirmTime: '确认订单时间',
    deliveryTime: '发货时间',
    groupPurchaseCaseId: '拼团实例ID',
    logisticsCompany: '物流公司信息',
    logisticsCompanyId: '物流公司ID',
    logisticsMoney: '物流费用',
    logisticsNo: '物流单号',
    logisticsType: '物流类型',
    logisticsId: '物流公司ID',
    orderMoney: '订单总金额',
    payType: '物流类型',
    refundTime: '确认退款时间',
    orderStatus: '订单状态',
    bankCode: '收款方开户行',
    encTrueName: '收款方用户名',
    encBankNo: '收款方银行卡号',
    noticeCon: '消息内容',
    noticeStatus: '消息状态',
    inviteCode: '邀请码',
    headThumb: '头像',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定',
    today: '今日',
    yesterday: '昨日',
    lastWeek: '上周',
    UV: '独立访客（UV）',
    old: '老独立访客',
    new: '新独立访客',
    onRatio: '新老占比'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  }
}
