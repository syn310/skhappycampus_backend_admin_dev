const systemMessage = {
    search : {
        targetMissing: 'Target is missing',
        incorrectKey: 'Incorrect target key : '
    },
    insert : {
    },
    delete : {
        success: 'Successfully deleted',
    },
    create : {
    },
    update : {
    },
    login : {
      invalidInfo: 'ID 혹은 패스워드를 확인해주세요',
    },
    token : {
      tokenRequired: 'token is required!',
      tokenExpired: 'TokenExpiredError : 토큰이 만료되었습니다.',
      tokenInvalidInfo: 'JsonWebTokenError : 토큰이 유효하지 않습니다.',
      tokenDisagreement: '토큰이 서로 일치 하지 않습니다.'
    },
    analysis : {
      error: '자소서 분석중 오류가 발생하였습니다.'
    }
}

module.exports = systemMessage;
