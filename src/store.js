import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        isStu:"",
        user: {},
        papers:[]
    },
    getters:{
        getUser(state){
            return state.user;
        },
        getIdentity(state){
            return state.isStu == true ? "学生" : "老师";
        },
        getIsStu(state){
            return state.isStu;
        },
        getpapers(state){
          return state.papers;
        },
        getBriefPapers(state){
            return state.papers.map((current)=>{
                let temp=JSON.parse(JSON.stringify(current));
                delete temp.singleChoice;
                delete temp.competition;
                return temp;
            })
        },
        getPaperByIndex(state){
            return function(index){
                let paper=state.papers[index];
                paper.index=index;
                return paper;
            }
        }
    },

    mutations: {
        init(state,initType){
            if(initType=='clear'){
                console.log("clear");
                state.isStu="";
                state.user={};
                sessionStorage.removeItem("ES_isStu");
                sessionStorage.removeItem("ES_User");

            }else if(initType=="reload") {
                //由于刷新state状态会清除
                console.log("reload");
                state.isStu=JSON.parse(sessionStorage.getItem("ES_isStu"));
                state.user=JSON.parse(sessionStorage.getItem("ES_User"));

                state.papers=JSON.parse(localStorage.getItem("ES_papers"));
            }

        },
        login(state, user) {
            state.user = user;
        },
        isStu(state,isStu){
            state.isStu=isStu;
        },
        papers(state,papers){
            state.papers=papers;
        },
        submitPaperScore(state,arg){
          state.papers[arg.paperIndex].score=arg.score;
          state.papers[arg.paperIndex].timeConsuming="35"; 
          localStorage.setItem("ES_papers",JSON.stringify(state.papers));
        }
        

    },
    actions: {
        login(context, user) {
          console.log("context");
          console.log(context);
            //初始化：用浏览器存储简单实现papers的存储
            let papers=JSON.parse(localStorage.getItem("ES_papers"));
            if(!papers){
                papers=[
                    {
                      name: "全国大学生计算机二级考试0",
                      level: "2",
                      total: "100",
                      score: "",
                      date: "2018-07-25",
                      timeConsuming: "",
                      timeLimit: "60",
                      scorePerSC: 5,
                      scorePerC: 2,
                      singleChoice: [
                        {
                          id: "0",
                          question:
                            "在软件开发过程中，我们可以采用不同的过程模型，下列有关 增量模型描述正确的是（ ）",
                          A: "是一种线性开发模型，具有不可回溯性",
                          B:
                            "把待开发的软件系统模块化，将每个模块作为一个增量组件，从而分批次地分析、设计、编码和测试这些增量组件",
                          C: "适用于已有产品或产品原型（样品），只需客户化的工程项目",
                          D: "软件开发过程每迭代一次，软件开发又前进一个层次",
                          answer: "A",
                          myAnswer:""
                        },
                        {
                          id: "1",
                          question: "下面有关值类型和引用类型描述正确的是？（ ）",
                          A:
                            "值类型的变量赋值只是进行数据复制，创建一个同值的新对象，而引用类型变量赋值，仅仅是把对象的引用的指针赋值给变量，使它们共用一个内存地址。",
                          B:
                            "值类型数据是在栈上分配内存空间，它的变量直接包含变量的实例，使用效率相对较高。而引用类型数据是分配在堆上。",
                          C:
                            "引用类型一般都具有继承性，但是值类型一般都是封装的，因此值类型不能作为其他任何类型的基类。",
                          D:
                            "值类型变量的作用域主要是在栈上分配内存空间内，而引用类型变量作用域主要在分配的堆上。",
                          answer: "A",
                          myAnswer: ""
                        },
                        {
                          id: "2",
                          question: "如何在多线程中避免发生死锁？（ ）",
                          A: "允许进程同时访问某些资源。",
                          B: "允许进程强行从占有者那里夺取某些资源。",
                          C: "进程在运行前一次性地向系统申请它所需要的全部资源。",
                          D:
                            "把资源事先分类编号，按号分配，使进程在申请，占用资源时不会形成环路。",
                          answer: "A",
                          myAnswer: ""
                        },
                        {
                          id: "3",
                          question:
                            "以下为求0到1000以内所有奇数和的算法，从中选出描述正确的算法。（ ）",
                          A: "①s=1；②i=1；③i=i+2；④s=s+i；⑤如果i≤1000，则返回③；⑥结束",
                          B: "①s=0；②i=1；③i=i+2；④s=s+i；⑤如果i≤1000，则返回③；⑥结束",
                          C: "①s=1；②i=1；③s=s+i；④i=i+2；⑤如果i≤1000，则返回③；⑥结束",
                          D: "①s=1；②i=1；③i=i+2；④s=s+i；⑤如果i≤1000，则返回③；⑥结束",
                          answer: "A",
                          myAnswer: ""
                        },
                        {
                          id: "4",
                          question: "关于递归法的说法不正确的是（ ）",
                          A: "程序结构更简洁",
                          B: "占用CPU的处理时间更多",
                          C: "要消耗大量的内存空间，程序执行慢，甚至无法执行",
                          D: "递归法比递推法的执行效率更高",
                          answer:"A",
                          myAnswer: ""
                        },
                        {
                          id: "5",
                          question:
                            "下面是一段关于计算变量s的算法： ①变量s的初值是0 ②变量i从1起循环到n，此时变量s的值由下面的式子表达式计算 ③s=s+(-1)*i ④输出变量s的值 这个计算s值的算法中，s的代数式表示是（ ）",
                          A: "1-2+3-4+„+(-1)n*(n-1)",
                          B: "1-2+3-4+„+(-1)n-1*n",
                          C: "1+2+3+4+...+(n-1)+n",
                          D: "-1-2-3-4-...-n",
                          answer:"A",
                          myAnswer: ""
                        }
                      ],
                      competition: [
                        {
                          question:
                            "计算机网络由负责信息处理的资源子网和负贵信息传递的_______组成。",
                          answer: ["接收方窗口"],
                          myAnswer: [""]
                        },
                        {
                          question:
                            "计算机网络的功能主要表现在硬件、软件资源的共享以及用户间______ 三个方面。",
                          answer: ["接收方窗口"],
                          myAnswer: [""]
                        },
                        {
                          question:
                            ".按照网络采用的传输技术可将计算机网络分为广播式网络和_________网络，还有_________等事情，软件资源的共享以及用户间______ 三个方面。",
                          answer: ["接收方窗口", "sad", "ASD"],
                          myAnswer: ["", "", ""]
                        },
                        {
                          question:
                            ".网络体系结构是计算机网络各层次结构模型及其_____的集合。",
                          answer: ["接收方窗口"],
                          myAnswer: [""]
                        }
                      ]
                    },
                    {
                      name: "大学英语四级考试1",
                      level: "4",
                      total: "100",
                      score: "55",
                      date: "2018-07-25",
                      timeConsuming: "35",
                      timeLimit: "60",
                      scorePerSC: 5,
                      scorePerC: 2,
                      singleChoice: [
                        {
                          id: "0",
                          question:
                            "在软件开发过程中，我们可以采用不同的过程模型，下列有关 增量模型描述正确的是（ ）",
                          A: "是一种线性开发模型，具有不可回溯性",
                          B:
                            "把待开发的软件系统模块化，将每个模块作为一个增量组件，从而分批次地分析、设计、编码和测试这些增量组件",
                          C: "适用于已有产品或产品原型（样品），只需客户化的工程项目",
                          D: "软件开发过程每迭代一次，软件开发又前进一个层次",
                          answer: "A",
                          myAnswer:"A"
                        },
                        {
                          id: "1",
                          question: "下面有关值类型和引用类型描述正确的是？（ ）",
                          A:
                            "值类型的变量赋值只是进行数据复制，创建一个同值的新对象，而引用类型变量赋值，仅仅是把对象的引用的指针赋值给变量，使它们共用一个内存地址。",
                          B:
                            "值类型数据是在栈上分配内存空间，它的变量直接包含变量的实例，使用效率相对较高。而引用类型数据是分配在堆上。",
                          C:
                            "引用类型一般都具有继承性，但是值类型一般都是封装的，因此值类型不能作为其他任何类型的基类。",
                          D:
                            "值类型变量的作用域主要是在栈上分配内存空间内，而引用类型变量作用域主要在分配的堆上。",
                          answer: "A",
                          myAnswer: ""
                        },
                        {
                          id: "2",
                          question: "如何在多线程中避免发生死锁？（ ）",
                          A: "允许进程同时访问某些资源。",
                          B: "允许进程强行从占有者那里夺取某些资源。",
                          C: "进程在运行前一次性地向系统申请它所需要的全部资源。",
                          D:
                            "把资源事先分类编号，按号分配，使进程在申请，占用资源时不会形成环路。",
                          answer: "A",
                          myAnswer: ""
                        },
                        {
                          id: "3",
                          question:
                            "以下为求0到1000以内所有奇数和的算法，从中选出描述正确的算法。（ ）",
                          A: "①s=1；②i=1；③i=i+2；④s=s+i；⑤如果i≤1000，则返回③；⑥结束",
                          B: "①s=0；②i=1；③i=i+2；④s=s+i；⑤如果i≤1000，则返回③；⑥结束",
                          C: "①s=1；②i=1；③s=s+i；④i=i+2；⑤如果i≤1000，则返回③；⑥结束",
                          D: "①s=1；②i=1；③i=i+2；④s=s+i；⑤如果i≤1000，则返回③；⑥结束",
                          answer: "A",
                          myAnswer: ""
                        },
                        {
                          id: "4",
                          question: "关于递归法的说法不正确的是（ ）",
                          A: "程序结构更简洁",
                          B: "占用CPU的处理时间更多",
                          C: "要消耗大量的内存空间，程序执行慢，甚至无法执行",
                          D: "递归法比递推法的执行效率更高",
                          answer:"A",
                          myAnswer: ""
                        },
                        {
                          id: "5",
                          question:
                            "下面是一段关于计算变量s的算法： ①变量s的初值是0 ②变量i从1起循环到n，此时变量s的值由下面的式子表达式计算 ③s=s+(-1)*i ④输出变量s的值 这个计算s值的算法中，s的代数式表示是（ ）",
                          A: "1-2+3-4+„+(-1)n*(n-1)",
                          B: "1-2+3-4+„+(-1)n-1*n",
                          C: "1+2+3+4+...+(n-1)+n",
                          D: "-1-2-3-4-...-n",
                          answer:"A",
                          myAnswer: ""
                        }
                      ],
                      competition: [
                        {
                          question:
                            "计算机网络由负责信息处理的资源子网和负贵信息传递的_______组成。",
                          answer: ["接收方窗口"],
                          myAnswer: ["接收方窗口"]
                        },
                        {
                          question:
                            "计算机网络的功能主要表现在硬件、软件资源的共享以及用户间______ 三个方面。",
                          answer: ["接收方窗口"],
                          myAnswer: [""]
                        },
                        {
                          question:
                            ".按照网络采用的传输技术可将计算机网络分为广播式网络和_________网络，还有_________等事情，软件资源的共享以及用户间______ 三个方面。",
                          answer: ["接收方窗口", "sad", "ASD"],
                          myAnswer: ["", "", ""]
                        },
                        {
                          question:
                            ".网络体系结构是计算机网络各层次结构模型及其_____的集合。",
                          answer: ["接收方窗口"],
                          myAnswer: [""]
                        }
                      ]
                    },
                    {
                      name: "专业英语六级考试2",
                      level: "4",
                      total: "100",
                      score: "55",
                      date: "2018-07-25",
                      timeConsuming: "35",
                      timeLimit: "60",
                      scorePerSC: 5,
                      scorePerC: 2,
                      singleChoice: [
                        {
                          id: "0",
                          question:
                            "在软件开发过程中，我们可以采用不同的过程模型，下列有关 增量模型描述正确的是（ ）",
                          A: "是一种线性开发模型，具有不可回溯性",
                          B:
                            "把待开发的软件系统模块化，将每个模块作为一个增量组件，从而分批次地分析、设计、编码和测试这些增量组件",
                          C: "适用于已有产品或产品原型（样品），只需客户化的工程项目",
                          D: "软件开发过程每迭代一次，软件开发又前进一个层次",
                          answer: "A",
                          myAnswer:"A"
                        },
                        {
                          id: "1",
                          question: "下面有关值类型和引用类型描述正确的是？（ ）",
                          A:
                            "值类型的变量赋值只是进行数据复制，创建一个同值的新对象，而引用类型变量赋值，仅仅是把对象的引用的指针赋值给变量，使它们共用一个内存地址。",
                          B:
                            "值类型数据是在栈上分配内存空间，它的变量直接包含变量的实例，使用效率相对较高。而引用类型数据是分配在堆上。",
                          C:
                            "引用类型一般都具有继承性，但是值类型一般都是封装的，因此值类型不能作为其他任何类型的基类。",
                          D:
                            "值类型变量的作用域主要是在栈上分配内存空间内，而引用类型变量作用域主要在分配的堆上。",
                          answer: "A",
                          myAnswer: ""
                        },
                        {
                          id: "2",
                          question: "如何在多线程中避免发生死锁？（ ）",
                          A: "允许进程同时访问某些资源。",
                          B: "允许进程强行从占有者那里夺取某些资源。",
                          C: "进程在运行前一次性地向系统申请它所需要的全部资源。",
                          D:
                            "把资源事先分类编号，按号分配，使进程在申请，占用资源时不会形成环路。",
                          answer: "A",
                          myAnswer: ""
                        },
                        {
                          id: "3",
                          question:
                            "以下为求0到1000以内所有奇数和的算法，从中选出描述正确的算法。（ ）",
                          A: "①s=1；②i=1；③i=i+2；④s=s+i；⑤如果i≤1000，则返回③；⑥结束",
                          B: "①s=0；②i=1；③i=i+2；④s=s+i；⑤如果i≤1000，则返回③；⑥结束",
                          C: "①s=1；②i=1；③s=s+i；④i=i+2；⑤如果i≤1000，则返回③；⑥结束",
                          D: "①s=1；②i=1；③i=i+2；④s=s+i；⑤如果i≤1000，则返回③；⑥结束",
                          answer: "A",
                          myAnswer: ""
                        },
                        {
                          id: "4",
                          question: "关于递归法的说法不正确的是（ ）",
                          A: "程序结构更简洁",
                          B: "占用CPU的处理时间更多",
                          C: "要消耗大量的内存空间，程序执行慢，甚至无法执行",
                          D: "递归法比递推法的执行效率更高",
                          answer:"A",
                          myAnswer: ""
                        },
                        {
                          id: "5",
                          question:
                            "下面是一段关于计算变量s的算法： ①变量s的初值是0 ②变量i从1起循环到n，此时变量s的值由下面的式子表达式计算 ③s=s+(-1)*i ④输出变量s的值 这个计算s值的算法中，s的代数式表示是（ ）",
                          A: "1-2+3-4+„+(-1)n*(n-1)",
                          B: "1-2+3-4+„+(-1)n-1*n",
                          C: "1+2+3+4+...+(n-1)+n",
                          D: "-1-2-3-4-...-n",
                          answer:"A",
                          myAnswer: ""
                        }
                      ],
                      competition: [
                        {
                          question:
                            "计算机网络由负责信息处理的资源子网和负贵信息传递的_______组成。",
                          answer: ["接收方窗口"],
                          myAnswer: ["接收方窗口"]
                        },
                        {
                          question:
                            "计算机网络的功能主要表现在硬件、软件资源的共享以及用户间______ 三个方面。",
                          answer: ["接收方窗口"],
                          myAnswer: [""]
                        },
                        {
                          question:
                            ".按照网络采用的传输技术可将计算机网络分为广播式网络和_________网络，还有_________等事情，软件资源的共享以及用户间______ 三个方面。",
                          answer: ["接收方窗口", "sad", "ASD"],
                          myAnswer: ["", "", ""]
                        },
                        {
                          question:
                            ".网络体系结构是计算机网络各层次结构模型及其_____的集合。",
                          answer: ["接收方窗口"],
                          myAnswer: [""]
                        }
                      ]
                    
                    },
                    {
                      name: "专业英语四级考试3",
                      level: "4",
                      total: "100",
                      score: "55",
                      date: "2018-07-25",
                      timeConsuming: "35",
                      timeLimit: "60",
                      scorePerSC: 5,
                      scorePerC: 2,
                      singleChoice: [
                        {
                          id: "0",
                          question:
                            "在软件开发过程中，我们可以采用不同的过程模型，下列有关 增量模型描述正确的是（ ）",
                          A: "是一种线性开发模型，具有不可回溯性",
                          B:
                            "把待开发的软件系统模块化，将每个模块作为一个增量组件，从而分批次地分析、设计、编码和测试这些增量组件",
                          C: "适用于已有产品或产品原型（样品），只需客户化的工程项目",
                          D: "软件开发过程每迭代一次，软件开发又前进一个层次",
                          answer: "A",
                          myAnswer:"A"
                        },
                        {
                          id: "1",
                          question: "下面有关值类型和引用类型描述正确的是？（ ）",
                          A:
                            "值类型的变量赋值只是进行数据复制，创建一个同值的新对象，而引用类型变量赋值，仅仅是把对象的引用的指针赋值给变量，使它们共用一个内存地址。",
                          B:
                            "值类型数据是在栈上分配内存空间，它的变量直接包含变量的实例，使用效率相对较高。而引用类型数据是分配在堆上。",
                          C:
                            "引用类型一般都具有继承性，但是值类型一般都是封装的，因此值类型不能作为其他任何类型的基类。",
                          D:
                            "值类型变量的作用域主要是在栈上分配内存空间内，而引用类型变量作用域主要在分配的堆上。",
                          answer: "A",
                          myAnswer: ""
                        },
                        {
                          id: "2",
                          question: "如何在多线程中避免发生死锁？（ ）",
                          A: "允许进程同时访问某些资源。",
                          B: "允许进程强行从占有者那里夺取某些资源。",
                          C: "进程在运行前一次性地向系统申请它所需要的全部资源。",
                          D:
                            "把资源事先分类编号，按号分配，使进程在申请，占用资源时不会形成环路。",
                          answer: "A",
                          myAnswer: ""
                        },
                        {
                          id: "3",
                          question:
                            "以下为求0到1000以内所有奇数和的算法，从中选出描述正确的算法。（ ）",
                          A: "①s=1；②i=1；③i=i+2；④s=s+i；⑤如果i≤1000，则返回③；⑥结束",
                          B: "①s=0；②i=1；③i=i+2；④s=s+i；⑤如果i≤1000，则返回③；⑥结束",
                          C: "①s=1；②i=1；③s=s+i；④i=i+2；⑤如果i≤1000，则返回③；⑥结束",
                          D: "①s=1；②i=1；③i=i+2；④s=s+i；⑤如果i≤1000，则返回③；⑥结束",
                          answer: "A",
                          myAnswer: ""
                        },
                        {
                          id: "4",
                          question: "关于递归法的说法不正确的是（ ）",
                          A: "程序结构更简洁",
                          B: "占用CPU的处理时间更多",
                          C: "要消耗大量的内存空间，程序执行慢，甚至无法执行",
                          D: "递归法比递推法的执行效率更高",
                          answer:"A",
                          myAnswer: ""
                        },
                        {
                          id: "5",
                          question:
                            "下面是一段关于计算变量s的算法： ①变量s的初值是0 ②变量i从1起循环到n，此时变量s的值由下面的式子表达式计算 ③s=s+(-1)*i ④输出变量s的值 这个计算s值的算法中，s的代数式表示是（ ）",
                          A: "1-2+3-4+„+(-1)n*(n-1)",
                          B: "1-2+3-4+„+(-1)n-1*n",
                          C: "1+2+3+4+...+(n-1)+n",
                          D: "-1-2-3-4-...-n",
                          answer:"A",
                          myAnswer: ""
                        }
                      ],
                      competition: [
                        {
                          question:
                            "计算机网络由负责信息处理的资源子网和负贵信息传递的_______组成。",
                          answer: ["接收方窗口"],
                          myAnswer: ["接收方窗口"]
                        },
                        {
                          question:
                            "计算机网络的功能主要表现在硬件、软件资源的共享以及用户间______ 三个方面。",
                          answer: ["接收方窗口"],
                          myAnswer: [""]
                        },
                        {
                          question:
                            ".按照网络采用的传输技术可将计算机网络分为广播式网络和_________网络，还有_________等事情，软件资源的共享以及用户间______ 三个方面。",
                          answer: ["接收方窗口", "sad", "ASD"],
                          myAnswer: ["", "", ""]
                        },
                        {
                          question:
                            ".网络体系结构是计算机网络各层次结构模型及其_____的集合。",
                          answer: ["接收方窗口"],
                          myAnswer: [""]
                        }
                      ]              
                    },
                    {
                      name: "专业英语四级考试4",
                      level: "4",
                      total: "100",
                      score: "55",
                      date: "2018-07-25",
                      timeConsuming: "35",
                      timeLimit: "60",
                      scorePerSC: 5,
                      scorePerC: 2,
                      singleChoice: [
                        {
                          id: "0",
                          question:
                            "在软件开发过程中，我们可以采用不同的过程模型，下列有关 增量模型描述正确的是（ ）",
                          A: "是一种线性开发模型，具有不可回溯性",
                          B:
                            "把待开发的软件系统模块化，将每个模块作为一个增量组件，从而分批次地分析、设计、编码和测试这些增量组件",
                          C: "适用于已有产品或产品原型（样品），只需客户化的工程项目",
                          D: "软件开发过程每迭代一次，软件开发又前进一个层次",
                          answer: "A",
                          myAnswer:"A"
                        },
                        {
                          id: "1",
                          question: "下面有关值类型和引用类型描述正确的是？（ ）",
                          A:
                            "值类型的变量赋值只是进行数据复制，创建一个同值的新对象，而引用类型变量赋值，仅仅是把对象的引用的指针赋值给变量，使它们共用一个内存地址。",
                          B:
                            "值类型数据是在栈上分配内存空间，它的变量直接包含变量的实例，使用效率相对较高。而引用类型数据是分配在堆上。",
                          C:
                            "引用类型一般都具有继承性，但是值类型一般都是封装的，因此值类型不能作为其他任何类型的基类。",
                          D:
                            "值类型变量的作用域主要是在栈上分配内存空间内，而引用类型变量作用域主要在分配的堆上。",
                          answer: "A",
                          myAnswer: ""
                        },
                        {
                          id: "2",
                          question: "如何在多线程中避免发生死锁？（ ）",
                          A: "允许进程同时访问某些资源。",
                          B: "允许进程强行从占有者那里夺取某些资源。",
                          C: "进程在运行前一次性地向系统申请它所需要的全部资源。",
                          D:
                            "把资源事先分类编号，按号分配，使进程在申请，占用资源时不会形成环路。",
                          answer: "A",
                          myAnswer: ""
                        },
                        {
                          id: "3",
                          question:
                            "以下为求0到1000以内所有奇数和的算法，从中选出描述正确的算法。（ ）",
                          A: "①s=1；②i=1；③i=i+2；④s=s+i；⑤如果i≤1000，则返回③；⑥结束",
                          B: "①s=0；②i=1；③i=i+2；④s=s+i；⑤如果i≤1000，则返回③；⑥结束",
                          C: "①s=1；②i=1；③s=s+i；④i=i+2；⑤如果i≤1000，则返回③；⑥结束",
                          D: "①s=1；②i=1；③i=i+2；④s=s+i；⑤如果i≤1000，则返回③；⑥结束",
                          answer: "A",
                          myAnswer: ""
                        },
                        {
                          id: "4",
                          question: "关于递归法的说法不正确的是（ ）",
                          A: "程序结构更简洁",
                          B: "占用CPU的处理时间更多",
                          C: "要消耗大量的内存空间，程序执行慢，甚至无法执行",
                          D: "递归法比递推法的执行效率更高",
                          answer:"A",
                          myAnswer: ""
                        },
                        {
                          id: "5",
                          question:
                            "下面是一段关于计算变量s的算法： ①变量s的初值是0 ②变量i从1起循环到n，此时变量s的值由下面的式子表达式计算 ③s=s+(-1)*i ④输出变量s的值 这个计算s值的算法中，s的代数式表示是（ ）",
                          A: "1-2+3-4+„+(-1)n*(n-1)",
                          B: "1-2+3-4+„+(-1)n-1*n",
                          C: "1+2+3+4+...+(n-1)+n",
                          D: "-1-2-3-4-...-n",
                          answer:"A",
                          myAnswer: ""
                        }
                      ],
                      competition: [
                        {
                          question:
                            "计算机网络由负责信息处理的资源子网和负贵信息传递的_______组成。",
                          answer: ["接收方窗口"],
                          myAnswer: ["接收方窗口"]
                        },
                        {
                          question:
                            "计算机网络的功能主要表现在硬件、软件资源的共享以及用户间______ 三个方面。",
                          answer: ["接收方窗口"],
                          myAnswer: [""]
                        },
                        {
                          question:
                            ".按照网络采用的传输技术可将计算机网络分为广播式网络和_________网络，还有_________等事情，软件资源的共享以及用户间______ 三个方面。",
                          answer: ["接收方窗口", "sad", "ASD"],
                          myAnswer: ["", "", ""]
                        },
                        {
                          question:
                            ".网络体系结构是计算机网络各层次结构模型及其_____的集合。",
                          answer: ["接收方窗口"],
                          myAnswer: [""]
                        }
                      ]
                    
                    }
                  ]
                //登陆时取出session中
                localStorage.setItem("ES_papers",JSON.stringify(papers));
            }
            context.commit('papers',papers);
            


            return new Promise(function (resolve, reject) {
                Vue.http.post("/login", user).then(data => {
                    //console.log(data)
                    if(data.body.Status){
                        reject(data.body.Status);
                    }else {
                        let isStu=user.isStudent;
                        let User=data.body[0];

                        //user附加的字段
                        User.institution="软件工程";
                        User.age="21";
                        User.paperNum="8";


                        context.commit('isStu',isStu);
                        context.commit('login', User);

                        //登陆时存入session中
                        sessionStorage.setItem("ES_User",JSON.stringify(User));
                        sessionStorage.setItem("ES_isStu",JSON.stringify(isStu));

                        resolve();
                    }

                });
            })
        },
        api(context, path, method = "GET", data = {}) {
            return new Promise(function (resolve, reject) {
                Vue.http({
                    url: path,
                    method: method,
                    data: data

                }).then(data => {
                    resolve(data);
                })
            })
        }
        
    }
})
