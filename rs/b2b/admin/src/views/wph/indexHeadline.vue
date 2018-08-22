<template>
  <div class="app-container">
    <el-row style="marginBottom:20px">
      <el-col :span="24">
        <el-button type="primary" @click="editBanner('add')">新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="headlineList" style="width: 100%">
          <el-table-column label="id" width="60">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="标题" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="图片" width="180">
            <template slot-scope="scope">
              <!-- <span style="margin-left: 10px">{{ scope.row.image }}</span> -->
              <img :src="scope.row.image" class="tableImg" />
            </template>
          </el-table-column>
          <el-table-column label="链接" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.link }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="姓名" width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.name }}</p>
                <p>住址: {{ scope.row.address }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button size="mini" @click="handleIndex(scope.$index, scope.row, 'up')" :disabled="scope.$index===0">上移</el-button>
              <el-button size="mini" @click="handleIndex(scope.$index, scope.row, 'down')" :disabled="scope.$index===headlineList.length-1">下移</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!-- Form -->

    <el-dialog :title="tempForm.fromTitle" :visible.sync="editHeadlineVisible">
      <el-form :model="tempForm" ref="headlineForm" :rules="rules">
        <el-form-item label="标题" label-width="80px" prop="title">
          <el-input v-model="tempForm.title"></el-input>
        </el-form-item>
        <el-form-item label="链接" label-width="80px" prop="link">
          <el-input v-model="tempForm.link"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeTempForm()">取 消</el-button>
        <el-button type="primary" @click="saveBanner('headlineForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postHomeHeadlineDel, getHomeHeadlineList, postHomeHeadlineSave, postHomeHeadlineUpdateInfo, postHomeHeadlineUpdateSort } from '@/api/a_api'

export default {
  name: 'indexHeadline',
  data() {
    return {
      editHeadlineVisible: false,
      headlineList: [],
      tempForm: {
        id: '',
        type: '',
        link: '',
        timestamp: new Date(),
        title: '',
        fromTitle: ''
      },
      rules: {
        link: [
          { required: true, message: '请输入跳转链接', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      }
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
      this.getHeadlineList()
    },
    getHeadlineList() {
      getHomeHeadlineList().then(res => {
        // console.log(res, 'res')
        if (res.code === 200) {
          this.headlineList = res.data
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    editBanner(type, row) {
      switch (type) {
        case 'add': this.tempForm.fromTitle = '新增头条'
          break
        case 'edit': this.tempForm.fromTitle = '修改头条'
          this.tempForm.id = row.id
          this.tempForm.title = row.title
          this.tempForm.link = row.link
          break
        default: this.tempForm.title = ''
          break
      }
      this.tempForm.type = type
      this.editHeadlineVisible = true
    },
    saveBanner(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editHeadlineVisible = false
          // this.$refs['headlineForm'].clearValidate()
          const params = {
            title: this.tempForm.title,
            link: this.tempForm.link
          }
          if (this.tempForm.type === 'add') {
            postHomeHeadlineSave(params).then(res => {
              // console.log(res, 'res')
              if (res.code === 200) {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
                this.init()
                this.resetForm('headlineForm')
              }
            })
          } else if (this.tempForm.type === 'edit') {
            params.id = this.tempForm.id
            postHomeHeadlineUpdateInfo(params).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.init()
                this.resetForm('headlineForm')
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
      this.editBanner('edit', row)
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('确认删除该条数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postHomeHeadlineDel(row.id).then(res => {
          // console.log(res, 'res')
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
    handleIndex(index, row, type) {
      var newHeadlineList = [].concat(this.headlineList)
      var newIdList = []
      // console.log(index, row, type, 'item.id')
      if (type === 'up' && index !== 0) {
        this.headlineList.forEach((item, index) => {
          if (item.id === row.id) {
            const tempItem = newHeadlineList[index - 1]
            newHeadlineList[index - 1] = this.headlineList[index]
            newHeadlineList[index] = tempItem
            return
          }
        })
      } else if (type === 'down' && index !== this.headlineList.length - 1) {
        this.headlineList.forEach((item, index) => {
          if (item.id === row.id) {
            const tempItem = newHeadlineList[index + 1]
            newHeadlineList[index + 1] = this.headlineList[index]
            newHeadlineList[index] = tempItem
            return
          }
        })
      }
      newHeadlineList.forEach((item) => {
        newIdList.push(item.id)
      })
      // console.log(newIdList, 'newIdList')
      const params = new URLSearchParams()
      params.append('ids', newIdList)
      postHomeHeadlineUpdateSort(params).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.init()
        }
      })
    },
    closeTempForm() {
      this.editHeadlineVisible = false
      this.resetForm('headlineForm')
    }
  }
}
</script>

<style scoped>
.tableImg {
  width: 100%;
  display: block;
}
.tempUrlImg {
  height: 200px;
  display: block;
  margin: 20px auto 0;
}
</style>
