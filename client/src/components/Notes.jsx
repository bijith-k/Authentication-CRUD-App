import React from "react";
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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { notesSchema } from "../schemas";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const initialValues = {
  title: "",
  content: "",
};

const Notes = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const token = localStorage.getItem('userToken')
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: notesSchema,
      onSubmit: async (values, action) => {
        console.log(values);
        const { data } = await axios.post(
          "http://localhost:4000/add-note",
          values,
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
        } else {
          toast({
            title: data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      },
    });

  return (
    <div className="w-full">
      <div className="mt-8 flex justify-end ">
        <Button className="mr-5" variant="solid" onClick={onOpen}>
          Notes
        </Button>
      </div>
      <div>
        <p className="text-white font-bold text-lg text-center">
          No notes to show
        </p>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add your short note</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel htmlFor="title">Enter the title</FormLabel>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.title && touched.title ? (
                  <p className="text-red-700">{errors.title}</p>
                ) : null}
              </FormControl>
              <FormControl className="mt-3">
                <FormLabel htmlFor="content">Enter content</FormLabel>
                <Textarea
                  name="content"
                  id="content"
                  value={values.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.content && touched.content ? (
                  <p className="text-red-700 ">{errors.content}</p>
                ) : null}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="solid" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="blue" type="submit">
                Add note
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Notes;
