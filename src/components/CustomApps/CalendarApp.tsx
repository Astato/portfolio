import {
  Grid,
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  useTheme,
  Popover,
  Dialog,
  Theme,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers/";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { SetStateAction, useEffect, useState } from "react";

import { Add, Delete, Edit, MoreHoriz } from "@mui/icons-material";
import { differenceInCalendarDays } from "date-fns";

////// CHECK OVERLAP

interface ScheduleEvent {
  title: string;
  description: string;
  from?: string;
  to?: string;
  color: string;
  everyday?: boolean;
  days?: number; /// TBD
}

interface QuadrantProps {
  schedulesEvent: ScheduleEvent[];
  selectedDay: number;
  setScheduleEvent: React.Dispatch<SetStateAction<ScheduleEvent[]>>;
  setEventToEdit: React.Dispatch<
    SetStateAction<[ScheduleEvent | null, number]>
  >;
  theme: Theme;
  index?: number;
  setCreatedEventsStartingHours?: React.Dispatch<SetStateAction<string[]>>;
  setCreatedEventsEndingHours?: React.Dispatch<SetStateAction<string[]>>;

  id: string;
}

const ScheduleQuadrant: React.FC<QuadrantProps> = ({
  schedulesEvent,
  selectedDay,
  setScheduleEvent,
  setEventToEdit,
  theme,
  setCreatedEventsStartingHours,
  setCreatedEventsEndingHours,
  id,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const mainColor = theme.palette.primary.main;
  const backgroundColor = theme.palette.background.default;
  const mode = theme.palette.mode;
  let displayQuadrant = true;
  // const schedule = schedulesEvent[index];

  const scheduleQuadrant = schedulesEvent.map((schedule, index) => {
    const fromPosition = schedule.from ? new Date(schedule.from).getHours() : 0;
    const formatHour =
      fromPosition === 0
        ? "12AM"
        : fromPosition > 12
        ? fromPosition - 12 + "PM"
        : fromPosition + "AM";

    if (schedule.everyday) {
      if (id !== formatHour) {
        displayQuadrant = false;
      } else {
        displayQuadrant = true;
      }
    }

    if (!schedule.everyday && schedule.from) {
      const targetDate = new Date(schedule.from).getTime();
      const difference = differenceInCalendarDays(
        new Date(selectedDay),
        new Date(targetDate)
      );
      if (difference === 0) {
        if (id === formatHour) {
          displayQuadrant = true;
        } else {
          displayQuadrant = false;

          return;
        }
      } else {
        displayQuadrant = false;
      }
    }

    const fromPositionMinutes = schedule.from
      ? new Date(schedule.from).getMinutes()
      : 0;
    const toPosition = schedule.to ? new Date(schedule.to).getHours() : 0;
    const toPositionMinutes = schedule.to
      ? new Date(schedule.to).getMinutes()
      : 0;

    //prettier-ignore
    const totalDuration = ((toPosition -fromPosition ) + ((fromPositionMinutes * 60) / 3600 )) - ((toPositionMinutes * 60) / 3600);

    const open = Boolean(anchorEl);
    const handleEventEdit = (edit?: boolean) => {
      setAnchorEl(null);
      if (edit) {
        setEventToEdit([schedule, index]);
      }
      if (schedulesEvent.length - 1 === 0) {
        const eventDot = document.getElementsByClassName("event-dot")[0];
        if (eventDot) {
          eventDot.remove();
        }
        setScheduleEvent([]);
        if (setCreatedEventsEndingHours && setCreatedEventsStartingHours) {
          setCreatedEventsEndingHours([]);
          setCreatedEventsStartingHours([]);
        }
      } else {
        const eventDot = document.getElementsByClassName("event-dot");
        if (eventDot) {
          Array.from(eventDot).forEach((dot) => {
            if (
              dot.parentElement?.parentElement?.className.match("Mui-selected")
            ) {
              const dotEL = dot as HTMLElement;
              if (dotEL.style.backgroundColor === schedule.color) dot.remove();
            }
          });
        }
        if (setCreatedEventsEndingHours && setCreatedEventsStartingHours) {
          setCreatedEventsStartingHours((prev) => {
            const update = [...prev];
            update.splice(index, 1);
            return update;
          });
          setCreatedEventsEndingHours((prev) => {
            const update = [...prev];
            update.splice(index, 1);
            return update;
          });
        }
        setScheduleEvent((prev) => {
          const update = [...prev];
          update.splice(index, 1);
          return update;
        });
      }
    };

    return (
      <div
        key={index}
        style={{
          display: displayQuadrant ? "grid" : "none",
          gridTemplateColumns: "1fr 50px",
          alignItems: "flex-start",
          borderRadius: "18px",
          width: "96%",
          height: 63 * totalDuration + "px",
          top: fromPositionMinutes + "px",
          background: schedule.color,
          left: "9px",
          position:
            index >= 1 && fromPositionMinutes === 0 ? "absolute" : "relative",
          zIndex: "3",
        }}
        aria-hidden={displayQuadrant ? false : true}
      >
        <div style={{ textAlign: "left", margin: "0 0 1rem 1rem" }}>
          <p>{schedule.title}</p>
          <p>{schedule.description}</p>
        </div>
        <div style={{ margin: "0 auto" }}>
          <Button>
            <MoreHoriz
              sx={{ fill: "white" }}
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
              }}
            ></MoreHoriz>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                horizontal: "right",
                vertical: "top",
              }}
            >
              <div
                style={{
                  background: backgroundColor,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <Button onClick={() => handleEventEdit(true)}>
                  <Edit
                    sx={{ fill: mode === "dark" ? "white" : "black" }}
                  ></Edit>
                </Button>
                <Button onClick={() => setOpenDialog(true)}>
                  <Delete
                    sx={{ fill: mode === "dark" ? "white" : "black" }}
                  ></Delete>
                </Button>
              </div>
            </Popover>
          </Button>
        </div>
        <Dialog open={openDialog}>
          <Grid sx={{ width: "20rem", textAlign: "center" }}>
            <p style={{ fontSize: "18px", fontWeight: "bolder" }}>
              {" "}
              Are you sure you want to delete this event?
            </p>
            <p>This action is permanent</p>
            <Grid
              display={"flex"}
              overflow={"hidden"}
              bgcolor={backgroundColor}
            >
              <Button
                sx={{ color: mainColor }}
                size="medium"
                variant="text"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: "#8E000A", color: "white" }}
                size="medium"
                onClick={() => {
                  handleEventEdit();
                  setOpenDialog(false);
                }}
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Dialog>
      </div>
    );
  });

  return <>{scheduleQuadrant}</>;
};

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [openScheduler, setOpenScheduler] = useState<boolean>(false);
  const [colorSelect, setColorSelect] = useState<string>("#4285F4");
  const [eventName, setEventName] = useState<string>("New Event");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [eventDuration, setEventDuration] = useState<[string, string]>([
    "0",
    "0",
  ]);
  const [everyday, setEveryday] = useState<boolean>(false);
  const theme = useTheme();
  const mode = theme.palette.mode;
  const backgroundColor = theme.palette.background.default;
  const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const [scheduleEvent, setScheduleEvent] = useState<ScheduleEvent[]>([]);
  const [eventToEdit, setEventToEdit] = useState<
    [ScheduleEvent | null, number]
  >([null, 0]);
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);

  const [createdEventsStartingHours, setCreatedEventsStartingHours] = useState<
    string[]
  >([]);

  const [createdEventsEndingHours, setCreatedEventsEndingHours] = useState<
    string[]
  >([]);

  const [dataUpdate, setDataUpdate] = useState(false);

  useEffect(() => {
    setScheduleEvent(scheduleEvent);
  }, [dataUpdate, openScheduler]);

  const createNewScheduleEvent = () => {
    if (
      !eventToEdit[0] &&
      (createdEventsStartingHours.indexOf(eventDuration[0]) >= 0 ||
        createdEventsEndingHours.indexOf(eventDuration[1]) >= 0)
    ) {
      setOpenAlertDialog(true);
      return;
    }

    const newScheduleEvent = {
      title: eventName,
      description: eventDescription,
      from: eventDuration[0],
      to: eventDuration[1],
      color: colorSelect,
      everyday: everyday,
    };

    setCreatedEventsStartingHours((prev) => [...prev, eventDuration[0]]);
    setCreatedEventsEndingHours((prev) => [...prev, eventDuration[1]]);

    if (eventToEdit[0]) {
      const index = eventToEdit[1];
      setScheduleEvent((prev) => {
        const update = [...prev];
        update[index] = newScheduleEvent;
        return update;
      });
      setCreatedEventsStartingHours((prev) => {
        const update = [...prev];
        update[index] = eventDuration[0];
        return update;
      });
      setCreatedEventsEndingHours((prev) => {
        const update = [...prev];
        update[index] = eventDuration[1];
        return update;
      });
    } else {
      setScheduleEvent((prev) => {
        return [...prev, newScheduleEvent];
      });
    }
    setDataUpdate(!dataUpdate);
    if (!everyday) {
      const selectedDayElement =
        document.getElementsByClassName("Mui-selected")[0];

      let spanElement = selectedDayElement.querySelector("span");

      if (spanElement) {
        spanElement.style.display = "flex";
        spanElement.style.flexDirection = "row";
        spanElement.style.justifyContent = "center";
        spanElement.style.alignItems = "flex-end";
        spanElement.style.width = "100%";
        spanElement.style.height = "100%";
        spanElement.style.gap = "3px";

        const eventDot = document.createElement("div");
        eventDot.classList.add("event-dot");
        eventDot.setAttribute(
          "style",
          `background-color: ${
            colorSelect || "red"
          };width: 5px;height: 5px; position: relative;margin: 0;margin-bottom:5px; border-radius:"100%`
        );
        if (spanElement.childElementCount < 4) {
          spanElement.appendChild(eventDot);
        }
      }
    }

    setEventDescription("");
    setEventName("New Event");
    setEventToEdit([null, 0]);
    setColorSelect("#4285F4");
    setEveryday(false);
    setOpenScheduler(false);
  };

  useEffect(() => {
    setEventDuration(eventDuration);
  }, [eventDuration]);

  useEffect(() => {
    if (eventToEdit[0]) {
      const { title, description, color, everyday, from, to } = eventToEdit[0];
      setEventName(title);
      setEventDescription(description);
      setColorSelect(color);
      if (everyday) {
        setEveryday(everyday);
      }
      if (from && to) {
        setEventDuration([from, to]);
      }
      setOpenScheduler(true);
    }
  }, [eventToEdit]);

  return (
    <Grid
      columns={12}
      width={"100%"}
      container
      item
      height={"calc(100% - 30px)"}
      marginTop={"30px"}
    >
      <Grid xs={6} item container>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateCalendar
            value={selectedDay}
            onChange={(e) => {
              setSelectedDay(e);
            }}
          />
        </LocalizationProvider>
      </Grid>
      {openScheduler && (
        <Grid xs={4} container id="scheduler">
          <Box
            component={"form"}
            style={{
              height: "100%",
              display: "flex",
              margin: "auto",
              flexDirection: "column",
              gap: "3rem",
              overflowY: "auto",
            }}
            noValidate
            autoComplete="off"
          >
            <p style={{ marginBottom: "-2rem", fontSize: "21px" }}>
              {eventName}
              {eventToEdit[0] && <Edit />}
            </p>
            <TextField
              label="Event name"
              onChange={(e) => {
                e.target.value === ""
                  ? setEventName("New Event")
                  : setEventName(e.target.value);
              }}
            />
            <TextField
              label="Description"
              sx={{ fontSize: "20px", margin: "-2rem 0" }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <FormControlLabel
                sx={{ marginBottom: "-3rem" }}
                value={everyday}
                control={<Checkbox onChange={() => setEveryday(!everyday)} />}
                label="Everyday"
              />
              <TimePicker
                label="from"
                value={selectedDay}
                onChange={(e) => {
                  if (e) {
                    setEventDuration((prev) => [e.toString(), prev[0]]);
                  }
                }}
              ></TimePicker>
              <TimePicker
                label="to"
                sx={{
                  margin: "-2rem 0",
                  ".dialog": {
                    width: "1000rem",
                  },
                }}
                value={selectedDay}
                //prettier-ignore
                onChange={(e: any) => {
                  if (e) {
                    setEventDuration((prev) => [prev[0], e.toString()]);
                  }
                }}
              ></TimePicker>
            </LocalizationProvider>
            <Box>
              <FormControl fullWidth>
                <InputLabel>Color</InputLabel>
                <Select
                  value={colorSelect}
                  onChange={(e) => setColorSelect(e.target.value as string)}
                >
                  <MenuItem value="tomato">
                    <div
                      className="color-select-preview"
                      style={{
                        boxShadow: "inset 0 0 0 3px tomato",
                        background:
                          colorSelect === "tomato" ? "tomato" : "transparent",
                      }}
                    />
                    Tomato
                  </MenuItem>
                  <MenuItem value="#F28500">
                    <div
                      className="color-select-preview"
                      style={{
                        boxShadow: "inset 0 0 0 3px #F28500",
                        background:
                          colorSelect === "#F28500" ? "#F28500" : "transparent",
                      }}
                    />
                    Tangerine
                  </MenuItem>
                  <MenuItem value="#ffe135">
                    <div
                      className="color-select-preview"
                      style={{
                        boxShadow: "inset 0 0 0 3px #ffe135",
                        background:
                          colorSelect === "#ffe135" ? "#ffe135" : "transparent",
                      }}
                    />
                    Banana
                  </MenuItem>
                  <MenuItem value="#3EB489">
                    <div
                      className="color-select-preview"
                      style={{
                        boxShadow: "inset 0 0 0 3px #3EB489",
                        background:
                          colorSelect === "#3EB489" ? "#3EB489" : "transparent",
                      }}
                    />
                    Sage
                  </MenuItem>
                  <MenuItem value="#4F86F7">
                    <div
                      className="color-select-preview"
                      style={{
                        boxShadow: "inset 0 0 0 3px #4F86F7",
                        background:
                          colorSelect === "#4F86F7" ? "#4F86F7" : "transparent",
                      }}
                    />
                    Blueberry
                  </MenuItem>

                  <MenuItem value="#6f2da8">
                    <div
                      className="color-select-preview"
                      style={{
                        boxShadow: "inset 0 0 0 3px   #6f2da8",
                        background:
                          colorSelect === "#6f2da8"
                            ? "  #6f2da8"
                            : "transparent",
                      }}
                    />
                    Grape
                  </MenuItem>
                  <MenuItem value="#fc8eac">
                    <div
                      className="color-select-preview"
                      style={{
                        boxShadow: "inset 0 0 0 3px  #fc8eac ",
                        background:
                          colorSelect === "#fc8eac"
                            ? "  #fc8eac "
                            : "transparent",
                      }}
                    />
                    Flamingo
                  </MenuItem>
                  <MenuItem value="#41424C">
                    <div
                      className="color-select-preview"
                      style={{
                        boxShadow: "inset 0 0 0 3px #41424C",
                        background:
                          colorSelect === "#41424C" ? "#41424C" : "transparent",
                      }}
                    />
                    Graphite
                  </MenuItem>
                  <MenuItem value="#4285F4" defaultChecked>
                    <div
                      className="color-select-preview"
                      style={{
                        boxShadow: "inset 0 0 0 3px #4285F4",
                        background:
                          colorSelect === "#4285F4" ? "#4285F4" : "transparent",
                      }}
                    />
                    Default color
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Grid display={"flex"} gap={8} paddingBottom={"6rem"}>
              <Button
                onClick={() => {
                  if (eventToEdit[0]) {
                    /// if edit is cancelled
                    setOpenScheduler(false);
                    setEventToEdit([null, 0]);
                    createNewScheduleEvent();
                  } else {
                    setOpenScheduler(false);
                  }
                }}
              >
                Cancel
              </Button>
              <Button variant="contained" onClick={createNewScheduleEvent}>
                Confirm
              </Button>
            </Grid>
          </Box>
        </Grid>
      )}

      <Grid
        xs={5.5}
        columns={12}
        display={"flex"}
        item
        container
        id="calendar-schedule"
        style={{ backgroundColor: backgroundColor }}
      >
        <Grid
          xs={2}
          item
          container
          sx={{
            color: mode === "dark" ? "white" : "black",
            borderRight: "2px solid rgba(120,120,120, .3)",
            margin: ".5rem 1rem .5rem 1rem",
          }}
        >
          <Grid width={"100%"}>
            <Grid
              style={{
                margin: "auto",
                textAlign: "center",
                display: "flex",
                marginLeft: "-15px",
                flexDirection: "column",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  margin: "0 auto",
                  fontSize: "18px",
                }}
              >
                {selectedDay.toDateString().split(" ")[0]}
              </p>
              <p style={{ margin: "0 auto", fontSize: "27px" }}>
                {" "}
                {selectedDay.toDateString().split(" ")[2]}
              </p>
            </Grid>
          </Grid>
          <Grid>
            {hours.map((hour) => {
              const id = hour + "AM";
              return (
                <Grid
                  width={"100%"}
                  height={"3rem"}
                  textAlign={"center"}
                  key={id}
                >
                  <p style={{ fontSize: "15px", marginRight: "21rem" }}>
                    {hour} AM
                  </p>
                  <div
                    className="schedule-hours"
                    id={id}
                    style={{
                      width: "332px",
                      height: "0px",
                      borderTop: "2px solid rgba(120,120,120, .3)",
                      marginTop: "-26px",
                      marginLeft: "60px",
                      position: "relative",
                    }}
                  >
                    {/*asdsadoasdpkajdspojksdpoijasdpoijasdpoijsadoijasdiojdijadoijoadjosidjoasjijasdoaijdoaisjdoiajsoidjaiosjiodjaoisjdoijaos*/}
                    <ScheduleQuadrant
                      schedulesEvent={scheduleEvent}
                      selectedDay={selectedDay.getTime()}
                      setEventToEdit={setEventToEdit}
                      theme={theme}
                      setScheduleEvent={setScheduleEvent}
                      id={id}
                      setCreatedEventsEndingHours={setCreatedEventsEndingHours}
                      setCreatedEventsStartingHours={
                        setCreatedEventsStartingHours
                      }
                    />
                  </div>
                </Grid>
              );
            })}
            {hours.map((hour) => {
              const id = hour + "PM";
              return (
                <Grid
                  width={"100%"}
                  height={"3rem"}
                  textAlign={"center"}
                  key={id}
                >
                  <p style={{ fontSize: "15px", marginRight: "21rem" }}>
                    {hour} PM
                  </p>
                  <div
                    id={id}
                    className="schedule-hours"
                    style={{
                      width: "333px",
                      height: "0px",
                      borderTop: "2px solid rgba(120,120,120, .3)",
                      marginTop: "-26px",
                      marginLeft: "60px",
                      position: "relative",
                    }}
                  >
                    <ScheduleQuadrant
                      schedulesEvent={scheduleEvent}
                      selectedDay={selectedDay.getTime()}
                      setEventToEdit={setEventToEdit}
                      theme={theme}
                      setScheduleEvent={setScheduleEvent}
                      id={id}
                      setCreatedEventsEndingHours={setCreatedEventsEndingHours}
                      setCreatedEventsStartingHours={
                        setCreatedEventsStartingHours
                      }
                    />
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={9}></Grid>
        <Button
          onClick={() => setOpenScheduler(true)}
          variant="contained"
          sx={{
            position: "absolute",
            display: openScheduler ? "none" : "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "3.5rem",
            right: "3rem",
            bottom: "3rem",
            width: "3rem",
            filter: "opacity(.7)",
          }}
        >
          <Add />
        </Button>
      </Grid>
      <Dialog open={openAlertDialog}>
        <Grid sx={{ width: "20rem", textAlign: "center" }}>
          <p style={{ fontSize: "18px", fontWeight: "bolder" }}>
            You already have an scheduled event for this time and date. Or you
            have overlapping events
          </p>
          <p>Either Edit or remove it</p>
          <Grid display={"flex"} overflow={"hidden"} bgcolor={backgroundColor}>
            <Button
              variant="contained"
              sx={{ bgcolor: "#8E000A", color: "white" }}
              size="medium"
              onClick={() => {
                setOpenAlertDialog(false);
              }}
            >
              Ok
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </Grid>
  );
};
export default Calendar;
