const { widget } = figma
const { useSyncedState, SVG, usePropertyMenu, AutoLayout, Text, Frame, Rectangle, Input} = widget

const sampleData = [10, 40, 20, 30, 50, 35]
const colors = ['FF0000', '00FF00', '00FFFF', 'FFA500', 'FFFFFF', '00FFFF']
const labels = ["input 1", "input 2", "input 3", "input 4", "input 5", "Input 6"]

 // needs to be a synced state
const frame_h = 500

const bar_x = 50
const bar_y = 250

const label_x = 15
const label_y = 425

const frame_inc_y = 20

const add_button_x = 15
const add_button_y = 390

function BarGraphWidget() {
  const label_states = labels.map((data, index)=> useSyncedState(data, labels[index]));
  const [frame_w, setFrameW] = useSyncedState("frame width", 1000);
  const[frame_h, setFrameH] = useSyncedState("frame height", 500);
  const data_states = sampleData.map((data, index)=> useSyncedState(data.toString(), sampleData[index]));
  const [graphData, setGraphData] = useSyncedState('updatedData',[10,20,30,40]);
  
  // index[1] is the function and index[0] is the variable name

  // TODO when clicking to add something to an array, need to reset frame
  // need to add an extra input into the array
  return (
    <Frame
      name="widget"
      overflow="visible" 
      width={frame_w}
      height={frame_h}
      fill="#C5C5C5"
    >
    <AutoLayout
      direction="horizontal"
      spacing={15}
      
      verticalAlignItems={'end'}
      x={bar_x}
      y= {bar_y}

    >

    {sampleData.map((height, index)=> (
      <Rectangle 
          key={index}
          width={125}
          height={data_states[index][0] * 2.5}
          fill={{ type: 'solid',  color: colors[index] }}     
        
      />
      
      ))}

  </AutoLayout>
  <AutoLayout
  direction="horizontal"
  spacing={135}

  x = {add_button_x}
  y = {add_button_y}
  >
   {sampleData.map((height, index)=> (
      <SVG
      src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="15" fill="white"/>
      <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="green" fill-opacity="0.8"/>
      <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
      </svg>`}
      onClick={() => {
        if(data_states[index][0] <= 50)
          data_states[index][1](data_states[index][0] + 10)
          

      }}
    ></SVG>
      ))} 
  </AutoLayout>
  <AutoLayout
  direction="horizontal"
  spacing={15}

  x={label_x}
  y = {label_y}>
  {labels.map((data, index) => (
          <AutoLayout
            key={index}
            verticalAlignItems={'center'}
            padding={10}
            horizontalAlignItems={'center'}
          >
            <Input value={label_states[index][0]} fontSize = {22} width={100} onTextEditEnd={(e) => label_states[index][1](e.characters)} />
          </AutoLayout>
        ))}
  </AutoLayout>
  <AutoLayout
  direction = "horizontal"
  x = {frame_w - 50}
  y = {frame_inc_y}>
     <SVG
        src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="30" rx="15" fill="white"/>
        <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="green" fill-opacity="0.8"/>
        <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
        </svg>`}
        onClick={() => {
          setFrameW(frame_w + 50)
        }}
      ></SVG>
  </AutoLayout>
  </Frame>
  )
}

widget.register(BarGraphWidget)