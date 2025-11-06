import router from '@ohos.router';

export default {

    data: {
        index:0,
        timeList:[
            {percent:8,
        timeAmount:5,
                initialDurationInMinutes:-1
      },

            {percent:16,
                timeAmount:10,
               },

            {percent:33,
                timeAmount:20,
            },

            {percent:50,
                timeAmount:30,
               },

            {percent:100,
                timeAmount:60,
            },
        ],
        selectedTimeAmount:0,
    },

    goTimerScreen(timeAmount){


        router.replaceUrl({
            uri: "pages/timer/timer",
            params:{
                timeAmount: `${timeAmount}:00`,
                initialDurationInMinutes:timeAmount
            }
        });
    },

};
