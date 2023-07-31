import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Text,
  Box,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { notesSchema } from "../schemas";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { FaCalendarDay } from "react-icons/fa";

const Notes = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem("userToken");
 
  const [toastMessage, setToastMessage] = useState("");
  const [selectedNote, setSelectedNote] = useState({
    title: "",
    content: "",
    _id:""
  });

  // const initialValues = {
  //   title: selectedNote ? selectedNote.title : "",
  //   content: selectedNote ? selectedNote.content : "",
  // };

   

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: notesSchema,
    onSubmit: async (values, action) => {
      let method = "post";
      let url = "http://localhost:4000/add-note";
      if (selectedNote) {
        method = "put";
        url = `http://localhost:4000/edit-note/${selectedNote._id}`;
      }
      const { data } = await axios[method](url, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        toast({
          title: data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        action.resetForm();
        onClose();
        setToastMessage(`Clicked at ${new Date().toISOString()}`);
      } else {
        toast({
          title: data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        // onClose()
      }
    },
  });

  useEffect(() => {
    getNotes();
  }, [toastMessage]);


   useEffect(() => {
     if (selectedNote !== null) {
       formik.setValues({
         title: selectedNote.title,
         content: selectedNote.content,
       });
     } else {
       formik.resetForm();
     }
   }, [selectedNote]);

  const getNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/get-notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setNotes(data.note);
      } else {
        toast({
          title: data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  function getDateAndTime(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;

    return {
      date: `${year}-${month}-${day}, ${hours12}:${minutes} ${ampm}`,
    };
  }

  const handleEdit = (note) => {
    try {
      setSelectedNote({
        title: note.title,
        content: note.content,
        _id:note._id
      });
      onOpen();
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/delete-note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast({
          title: data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setToastMessage(`Clicked at ${new Date().toISOString()}`);
      } else {
        toast({
          title: data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedNote(null);
    }
  }, [isOpen]);

  return (
    <div className="w-screen">
      {/* <div className="mt-8 flex justify-end">
        <Button className="mr-5" variant="solid" onClick={onOpen}>
          Notes
        </Button>
      </div> */}
      <div className="">
        {notes.length > 0 ? (
          <Box
            width="100%"
            maxW="900px"
            mx="auto"
            p="4"
            overflowX="hidden"
            overflowY="auto"
          >
            <p className="font-bold text-white my-5 text-2xl text-center">
              You have {notes.length} notes
            </p>
            <div className="flex justify-center my-4">
              <Button variant="solid" onClick={onOpen}>
               Add new notes
              </Button>
            </div>

            <SimpleGrid minChildWidth="250px" spacing="4">
              {notes.map((note, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Heading size="md"> {note.title}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>{note.content}</Text>
                  </CardBody>
                  <CardFooter className="flex flex-col">
                    <Text>
                      <span>
                        <FaCalendarDay className="inline mr-3" />
                        <span className="inline font-semibold">
                          {getDateAndTime(note.date).date}
                        </span>
                      </span>
                    </Text>
                    <div className="flex mt-4">
                      <Button
                        className="mr-2"
                        colorScheme="blue"
                        onClick={() => handleEdit(note)}
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDelete(note._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        ) : (
          <div className="flex flex-col items-center justify-center mt-10">
            <p className="text-white font-bold text-2xl text-center">
              There is no notes to show
            </p>
            <Button className="m-5" variant="solid" onClick={onOpen}>
              Add notes
            </Button>
          </div>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {" "}
            {selectedNote ? "Edit your short note" : "Add your short note"}
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel htmlFor="title">Enter the title</FormLabel>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.title && formik.touched.title ? (
                  <p className="text-red-700">{formik.errors.title}</p>
                ) : null}
              </FormControl>
              <FormControl className="mt-3">
                <FormLabel htmlFor="content">Enter content</FormLabel>
                <Textarea
                  name="content"
                  id="content"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.content && formik.touched.content ? (
                  <p className="text-red-700 ">{formik.errors.content}</p>
                ) : null}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="solid" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="blue" type="submit">
                {selectedNote ? "Update note" : "Add note"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Notes;
