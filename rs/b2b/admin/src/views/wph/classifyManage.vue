<template>
  <div class="app-container">
    <el-row style="marginBottom:20px">
      <el-col :span="24">
        <el-button type="primary" @click="editClassify('add')">新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="classifyList" style="width: 100%">
          <el-table-column label="id" width="60" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.label')" >
            <template slot-scope="scope">
              <div :class="{classifyNameOut:scope.row.parentId!==0}"><img :src="childrenClassifyImg" class="childrenClassifyImg" v-show="scope.row.parentId!==0"/><span class="classifyName">{{ scope.row.label }}</span></div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.image')" width="180" align='center'>
            <template slot-scope="scope">
              <img :src="scope.row.image" class="tableImg" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.describe')" width="180" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.describe }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column :label="$t('table.parentId')" width="180" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.parentId }}</span>
            </template>
          </el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination 
          background 
          @size-change="handleSizeChange" 
          @current-change="handleCurrentChange" 
          :current-page="listQuery.page" 
          :page-sizes="[10,20,30, 50]" 
          :page-size="listQuery.pageSize" 
          layout="total, sizes, prev, pager, next, jumper" 
          :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <!-- Form -->

    <el-dialog :title="tempForm.fromTitle" :visible.sync="editClassifyVisible">
      <el-form :model="tempForm" ref="tempForm" :rules="rules">
        <el-form-item label="名称" label-width="80px" prop="label">
          <el-input v-model="tempForm.label"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="80px" prop="describe">
          <el-input v-model="tempForm.describe"></el-input>
        </el-form-item>
        <el-form-item label="分类" label-width="80px" >
          <el-select v-model="tempForm.parentId" placeholder="分类">
            <el-option :label="item.label" :value="item.id" v-for="(item,index) in parentIdList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片地址" label-width="80px" prop="imgUrl">
          <el-input v-model="tempForm.imgUrl" auto-complete="off" disabled placeholder="请点击下方上传按钮上传图片"></el-input>
        </el-form-item>
        <el-upload class="upload-demo" action="http://demo.lbsrj.cn/c-api/image/upload" ref="upload" :show-file-list=false :on-success="handleSuccess" :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <span slot="tip" class="el-upload__tip" style="marginLeft:10px">只能上传jpg/png文件</span>
        </el-upload>
        <img class="tempUrlImg" :src="tempForm.imgUrl">
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeTempForm()">取 消</el-button>
        <el-button type="primary" @click="saveClassify('tempForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postClassifyDel, getClassifyAllList, postClassifySave, postClassifyUpdate } from '@/api/a_api'
import childrenClassifyImg from '@/assets/classify/childrenClassifyImg.gif'

export default {
  name: 'classifyManage',
  data() {
    return {
      childrenClassifyImg,
      list: null,
      parentIdList: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20,
        keyword: null,
        title: null,
        type: null,
        sort: null,
        startTime: null,
        endTime: null
      },
      dialogTableVisible: false,
      editClassifyVisible: false,
      classifyList: [],
      tempForm: {
        id: '',
        type: '',
        label: '',
        describe: '',
        imgUrl: 'http://demo.aooooz.com/image/2018-08-31/5ab330e5d05f4791bbedcc4fc72b958c.jpg',
        parentId: '',
        timestamp: new Date(),
        fromTitle: ''
      },
      rules: {
        label: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '请选择父分类ID', trigger: 'change' }
        ],
        imgUrl: [
          { required: true, message: '请点击下方上传按钮上传图片', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px'
    }
  },
  components: {
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    init() {
      this.getList()
    },
    getList() {
      const params = {}
      params.page = this.listQuery.page
      params.pageSize = this.listQuery.pageSize

      getClassifyAllList(params).then(res => {
        console.log(res, 'res')
        const list = []
        const parentIdList = [{
          id: 0,
          label: '一级分类'
        }]
        if (res.code === 200 && res.data.records) {
          this.total = res.data.total
          this.listQuery.page = res.data.current
          this.listQuery.pageSize = res.data.size
          for (const parent of res.data.records) {
            const parantItem = {
              id: parent.id,
              label: parent.label,
              describe: parent.describe,
              image: parent.image,
              parentId: parent.parentId
            }
            list.push(parantItem)
            parentIdList.push(parantItem)
            if (parent.children) {
              for (const children of parent.children) {
                const childrenItem = {
                  id: children.id,
                  label: children.label,
                  describe: children.describe,
                  image: children.image,
                  parentId: children.parentId
                }
                list.push(childrenItem)
              }
            }
          }
          console.log(list, 'list', parentIdList)
          this.classifyList = list
          this.parentIdList = parentIdList
        }
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList)
      if (response.code === 200) {
        this.tempForm.imgUrl = response.data
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    editClassify(type, row) {
      switch (type) {
        case 'add': this.tempForm.fromTitle = '新增分类'
          this.tempForm.parentId = 0
          break
        case 'edit': this.tempForm.fromTitle = '修改分类'
          this.tempForm.id = row.id
          this.tempForm.label = row.label
          this.tempForm.describe = row.describe
          this.tempForm.imgUrl = row.image
          this.tempForm.parentId = row.parentId
          break
        default: this.tempForm.label = ''
          break
      }
      this.tempForm.type = type

      this.editClassifyVisible = true
    },
    saveClassify(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editClassifyVisible = false
          const params = {
            label: this.tempForm.label,
            describe: this.tempForm.describe,
            parentId: this.tempForm.parentId,
            image: this.tempForm.imgUrl
          }
          if (this.tempForm.type === 'add') {
            postClassifySave(params).then(res => {
              console.log(res, 'res')
              if (res.code === 200) {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
                this.init()
                this.resetForm('tempForm')
              }
            })
          } else if (this.tempForm.type === 'edit') {
            params.id = this.tempForm.id
            postClassifyUpdate(params).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.init()
                this.resetForm('tempForm')
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleEdit(index, row) {
      this.editClassify('edit', row)
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('确认删除该条数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postClassifyDel(row.id).then(res => {
          console.log(res, 'res')
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.init()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    closeTempForm() {
      this.editClassifyVisible = false
      this.resetForm('tempForm')
    }
  }
}
</script>

<style scoped>
.classifyNameOut{
  overflow: hidden;
  padding-left: 150px;
  position: relative;
}
.childrenClassifyImg{
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -15px;
  width: auto;
  height: 30px;
}
.classifyName{
  display: block;
  line-height: 30px;
}
.tableImg {
  height: 80px;
  width: auto;
  display: block;
  margin: 0 auto;
}
.tempUrlImg {
  height: 200px;
  display: block;
  margin: 20px auto 0;
}
</style>
