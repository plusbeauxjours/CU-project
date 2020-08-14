import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View``;
const Text = styled.Text``;

export default () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.inner}>
        <View style={{...styles.explainList, marginBottom: 30}}>
          <View style={styles.explainTitle}>
            <Text style={{color: '#642A8C', fontSize: 20, fontWeight: 'bold'}}>
              근로기준법
            </Text>
          </View>
          <Text style={styles.explainText}>
            이제는 근로기준법에 맞는 근로계약서를
          </Text>
          <Text style={styles.explainText}>자동으로 작성하세요.</Text>
        </View>
        <View style={{...styles.explainList, marginBottom: 30}}>
          <View style={styles.explainTitle}>
            <Text style={{color: '#642A8C', fontSize: 20, fontWeight: 'bold'}}>
              전자서명
            </Text>
          </View>
          <Text style={styles.explainText}>
            매번 근로자를 직접 만나서 게약을 체결하기 번거롭지
          </Text>
          <Text style={styles.explainText}>
            않으신가요? 이제는 전자서명으로 간편하게
          </Text>
          <Text style={styles.explainText}>계약을 체결하세요.</Text>
        </View>
        <View style={styles.explainList}>
          <View style={styles.explainTitle}>
            <Text style={{color: '#642A8C', fontSize: 20, fontWeight: 'bold'}}>
              저장,관리
            </Text>
          </View>
          <Text style={styles.explainText}>
            근로게약서 저장관리가 어려우신가요?
          </Text>
          <Text style={styles.explainText}>
            이제는 근로계약서를 한 곳에서 저장하고 관리하세요.
          </Text>
        </View>

        <View style={styles.linkArea}>
          <Text style={{color: 'red'}}>
            {'     '} *중요 : 아래 사항으로 입력해주시기 바랍니다.
          </Text>
          <Text style={styles.explainText}>
            {'      '} - 회사명 : CU 지점명
          </Text>
          <Text style={styles.explainText}>
            {'      '} - 가입경로 : 자버 담당자 미팅
          </Text>

          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => {
              this.setState({isModalVisible: true});
            }}>
            <Text style={{color: '#FF3D3D', fontSize: 16}}>(선택)</Text>
            <Text style={{marginLeft: 5, color: '#642A8C', fontSize: 16}}>
              전자근로계약서 작성하기
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        isVisible={this.state.isModalVisible}
        onBackdropPress={() => this.setState({isModalVisible: false})}
        style={{flex: 1, margin: 0, justifyContent: 'flex-end'}}
        avoidKeyboard={false}>
        <View style={{flexDirection: 'column'}}>
          <View style={styles.modalHeader}>
            <Text style={{paddingBottom: 15, paddingLeft: 10, color: '#aaa'}}>
              .
            </Text>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => {
                this.setState({
                  isModalVisible: false,
                });
              }}>
              <AntDesign
                name="closecircleo"
                size={30}
                color="#642A8C"
                style={{marginRight: 5}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              width: '100%',
              height: isIphoneX()
                ? hp('82%')
                : StatusBar.currentHeight > 30
                ? hp('94%')
                : hp('90%'),
              marginBottom: isIphoneX() ? 45 : 0,
            }}>
            {this.state.visibleWebviewSpinner ? (
              <ActivityIndicator
                color="#009688"
                size="large"
                style={{
                  flex: 1,
                  marginTop: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            ) : null}
            <WebView
              source={{uri: 'https://bit.ly/2WFaeL4'}}
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
              onMessage={(event) => {}}
              onLoadStart={() => this.showSpinner()}
              onLoad={() => this.hideSpinner()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
