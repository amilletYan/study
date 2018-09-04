可伸缩容器
display：flex 代表这个容器是一个可伸缩容器，还可以取值为inline-flex,
              两者的区别在于前者将这个容器渲染为块级元素，后者将其渲染为内联元素。
flex-direction属性，它的取值为row，column，column-reverse，row-reverse,
              默认值是row，表示在水平方向上展开可伸缩项
justify-content属性，用来表示可伸缩项目在主轴方向上的对齐方式，
               可以取值为flex-start,flex-end,center,space-between,space-around
               space-between表示两端对齐并将剩余空间在主轴方向上进行平均分配，
               space-around表示居中对齐然后在主轴方向上将剩余空间平均分配
align-items属性,用来表示可伸缩项目在侧轴方向上的对齐方式，
               可取的值有flex-start,flex-end,center,baseline,stretch
               baseline值，它是按照一个计算出来的基准线然后让这些项目沿这个基准线对齐，基准线的计算取决于可伸缩项目的尺寸及内容
               stretch,这个是取值会让可伸缩项目在侧轴方向上进行拉伸，前提是这些项目在侧轴方向上没有设置尺寸，否则会按照你设置的尺寸来渲染。
flex-wrap属性表示是否支持换行或者换列，它有nowrap,wrap,wrap-reverse三个取值，
               nowrap是默认值，表示不换行或者换列，
               wrap表示换行或者换列，
               wrap-reverse表示支持换行或者换列，但是会沿着相反方向进行排列（如主轴是垂直方向换行后就按照先下后上的顺序来排列伸缩项）
align-content属性用来表示换行之后各个伸缩行在侧轴的对齐方式，意义和justify-content属性取值意义相同
flex-flow属性，该属性是个复属性，它是flex-direction和flex-wrap的复合属性，flex-direction：row;flex-wrap:wrap就等同于flex-flow:row wrap

可伸缩项目
order属性，该属性用来表示伸缩项目的排列顺序，默认情况下，每个伸缩项的order都是0，改属性可正可负，越大的值会被排列在越后面。
margin属性在flexbox布局中有很强大的作用，如果给某个可伸缩项设置某个方向上的margin为auto，
      那么这个可伸缩项就会在这个方向上占用该方向的剩余空间来作为自己的这个方向上的margin。
      当伸缩项目的上右下左都为auto时，它就水平和垂直均居中显示
align-self属性，该属性是给各个可伸缩项设置自己的在侧轴上的对齐方式的，
          align-self属性会覆盖之前的align-item属性，让每个可伸缩项在侧轴上具有不同的对齐方式，取值和align-item相同
flex属性，它定义了伸缩项如何分配主轴尺寸，通常取值为auto或者数字，auto浏览器会自动均分，数（1,2,3）会按照伸缩项所占的数字比重来分配空间，
    这个属性会覆盖伸缩项在主轴上设定的尺寸，当给主轴上伸缩项设定了尺寸（宽或高）和这个属性的时候，事实上还是会按照这个属性来进行空间分配。



position:relative相对定位
1. 每个元素在页面的普通流中会“占有”一个位置，这个位置可以理解为默认值，而相对定位就是将元素偏离元素的默认位置，但普通流中依然保持着原有的默认位置。
  （在父级节点的content-box区定位，父级节点有文字的话，元素的默认位置则是紧随文字）
2. 不会改变行内元素的display属性。
3. 并没有脱离普通流，只是视觉上发生的偏移。

依然占据原位置，父级元素能得到它的高度

position:absolute绝对定位
1. 如何定位浮动？
   设置了TRBL
   相对最近的设定了position:relative/absolute的父（祖先）节点的padding-box的区进行定位（忽略文字），找不到符合条件的父（祖先）节点，则相对浏览器窗口进行定位。
   没有设置了TRBL
   则默认浮动，默认浮动在父级节点的content-box区。

   有trbl就相对有position(a/r)的上级按照trbl来，没有就按默认的来
   但是都脱离文档了，width默认(没设置)

2. 不管是块级元素还是行内元素，应用了position:absolute之后，display为block：(并不是指span会独占一行，而是它后面不会跟行内元素了)
   可以设置width和height
   没有设置的话，width默认为auto
3. 脱离文档流，容器（父）元素将得不到脱离普通流的子元素高度

inline元素的height无效
设了float:left的元素允许它的右边存在任何元素同行显示，不论是内联元素还是块元素。
          但它的左边还是不允许存在任何元素与之同行显示，哪怕其它的元素的代码在前，除非也给前面的元素加上float:left后，才允许同行显示。
设了display:inline的元素，允许它的前后存在其它的内联元素同行显示。
           关于代码在其前面的块元素之同行显示，则要让前面的元素浮动（不管是左还是右浮动）或设为display:inline，
           还有代码在后面的是块元素（管它有没有浮动，是左浮动还是右浮动），均不能与之同行，除非设为display:inline