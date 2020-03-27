<template>
  <div>
    <h1>上传图片转换字符画</h1>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="http://localhost:3000/image"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="onSuccess"
      :on-error="onError"
      :file-list="fileList"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传文件</el-button>
      <div slot="tip" class="el-upload__tip">只能上传一个jpg/png文件，且不超过500kb</div>
    </el-upload>
    <pre v-text="resText">
      {{resText}}
    </pre>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      fileList: [],
      resText: ""
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    onSuccess: function(res) {
      // console.log(123);
      console.log(res);
      console.log(res.resText);
      this.resText = res.resText;
      console.log(resText);
      // console.log(resData);
      // console.log(111);
      if (res.status == 200) {
        this.resData = res.data.resText;
        console.log(111)
      }
    },
    onError: function(res) {
      console.log(res);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
