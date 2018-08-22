<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.keyWord')" v-model="listQuery.keyword">
      </el-input>
      <!-- <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.importance" :placeholder="$t('table.importance')">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" :placeholder="$t('table.type')">
        <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select> -->
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <!-- <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>
      <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showReviewer">{{$t('table.reviewer')}}</el-checkbox> -->
    </div>

    <el-row>
      <el-col :span="24">
        <el-table :data="goodsList" style="width: 100%">
          <el-table-column label="id" align="center" width="60">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.WPH')" align="center" width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.wph }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.goodTitle')" align="center" width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.brand')" align="center" width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.product.brand }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.manufacturerName')" align="center" width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.manufacturerName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.specifications')" align="center" width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.specifications }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.unit')" align="center" width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.unit }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.salesVolume')" align="center" width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.salesVolume }}</span>
            </template>
          </el-table-column>
          <el-table-column label="图片" width="180">
            <template slot-scope="scope">
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-container">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { postHomeBannerDel, getGoodsList, postHomeBannerSave, postHomeBannerUpdateInfo } from '@/api/a_api'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'goodsManage',
  directives: {
    waves
  },
  data() {
    return {
      goodsList: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        keyword: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3]
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
      getGoodsList().then(res => {
        // console.log(res, 'res')
        if (res.code === 200) {
          this.goodsList = res.data.records
          this.total = res.data.total
        }
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
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
    editBanner(type, row) {
      switch (type) {
        case 'add': this.tempForm.fromTitle = '新增轮播图'
          break
        case 'edit': this.tempForm.fromTitle = '修改轮播图'
          this.tempForm.id = row.id
          this.tempForm.title = row.title
          this.tempForm.imgUrl = row.image
          this.tempForm.link = row.link
          break
        default: this.tempForm.title = ''
          break
      }
      this.tempForm.type = type
      this.editBannerVisible = true
    },
    saveBanner(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editBannerVisible = false
          // this.$refs['bannerForm'].clearValidate()
          const params = {
            title: this.tempForm.title,
            link: this.tempForm.link,
            image: this.tempForm.imgUrl
          }
          if (this.tempForm.type === 'add') {
            postHomeBannerSave(params).then(res => {
              console.log(res, 'res')
              if (res.code === 200) {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
                this.init()
                this.resetForm('bannerForm')
              }
            })
          } else if (this.tempForm.type === 'edit') {
            params.id = this.tempForm.id
            postHomeBannerUpdateInfo(params).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.init()
                this.resetForm('bannerForm')
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
        postHomeBannerDel(row.id).then(res => {
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
      this.editBannerVisible = false
      this.resetForm('bannerForm')
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
