# Software Studio 2022 Spring
## Assignment 01 Web Canvas

### Scoring

| **Basic components** | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Basic control tools | 30% | Y |
| Text input | 10% | Y |
| Cursor icon | 10% | Y |
| Refresh button | 5% | Y |

| **Advanced tools** | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Different brush shapes | 15% | Y |
| Un/Re-do button | 10% | Y |
| Image tool | 5% | Y |
| Download | 5% | Y |

| **Other useful widgets** | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Name of widgets | 1~5% | Y |

---

### How to use

 Describe how to use your web and maybe insert images to help you explain.
畫布:使用工具操作畫布
顏色選擇:點擊後能使用滑鼠、輸入rgb、16進位以選擇鉛筆、輸入、圖形、油漆桶、噴漆顏色。
滑桿:滑動調整鉛筆、橡皮擦、圖形、噴漆粗細。
字體:調整輸入字體。
字體大小:調整輸入字體大小。
鉛筆:預設工具，選擇後在畫布上點擊拖曳留下線條。
橡皮擦:選擇後在畫布上拖曳清除痕跡。
輸入(T):選擇後點擊畫布輸入字體。
圈圈:選擇後在畫布上拖曳畫圈。
三角:選擇後在畫布上拖曳畫三角。
長方:選擇後在畫布上拖曳畫長方。
油漆桶:選擇後點擊畫布將鄰近同色變為選擇顏色。
噴漆:選擇後在畫布上拖曳畫噴漆效果。
Fill(填滿):選擇後拖曳空心圖形改為拖曳實心圖形。
上一動:回上一動。
下一動:點擊上一動後可點擊下一動回下一動。
仙人掌(clear):清除畫布上所有痕跡。
上傳:點擊後上傳圖檔。
下載:下載當前畫布。
隱形藥水(去背景):去除背景。


### Function description

Describe your bouns function and how to use it.

畫布:
畫布有4種event:mousedown,move,up,out

鉛筆:
在mousedown時用fillrec()畫小點並記住當前位置，在mousemove時記住新的位置，使用moveTo()和lineTo()兩位置連線，重複動作會像是在畫線。

橡皮擦:
mousemove時，使用clearRect()清除經過的路徑，用第二個畫布記住原背景，再用putImagedata()在清除處放上原背景。

輸入:
使用createElement製作一個接收文字的input。當這個input收到enter時使這input的font變為他所接收到的輸入。

圈圈 :
拖曳開始時記住起始位置，每當mousemove時會記住當前位置，使用stroke(),arc(),起始,結束位置來畫圈，畫圈前需用getimagedata()來記住當前畫布，每次move時都需要先讀取原來的畫布再畫上新的圈才會看起來像是動態的。

三角:
拖曳和記住畫布動作同上，只是不使用arc()而是lineto()來畫三角。

長方:
同上，但多一條線。

Fill:
當Fill被勾選時，改用fill()而非stroke()來畫圖。

上/下一動:
每當畫布被改變時，都使用getimagedata將改變後的畫布存進一個array，並使用一個pointer記住現在這張圖是在array的哪個位置。 當上/下一動觸發時，會指到上/下張圖的位置，將它設為現在這張。

清除:
同橡皮擦使用clearRec()將整張畫布清除。將畫布大小設為預設大小。

上傳:
使用input type=file，被觸發後使用filereader讀一張圖片，將畫布大小設置和圖片一樣，再將圖片畫上畫布。

下載:
當下載被觸發時，使用toDataURL()，再將download setAttribute("href", image)。

油漆桶(bonus):
點擊畫布時若和設定的顏色不一樣，將這個pixel的位置存進stack，用bfs的方式將每個相連並且與點擊到的pixel同色的所有pixel走過並改他他們的顏色。

噴漆(bonus):
每當mousemove，getimagedata()後，用Math.random()做出XY方向的offset，用迴圈取出多組offset，將當前位置加上offset後的pixel們改為設定的顏色。

換背景(bonus):
使用第二個沒有背景的畫布紀錄畫布做出的改變，觸發後會交換兩個畫布。


     

### Gitlab page link

 your web page URL.
https://assignment1-a344b.web.app/

### Others (Optional)

 Anythinh you want to say to TAs.
 
hihi
