INSERT INTO `student` (`id`, `email`, `first_name`, `is_valid`, `last_name`, `password`) VALUES (NULL, 'rvandemaat@hotmail.com', 'Rik', b'1', 'van de Maat', 'test123');
INSERT INTO `student` (`id`, `email`, `first_name`, `is_valid`, `last_name`, `password`) VALUES (NULL, 'm.medendorp@gmail.com', 'Marcel', b'1', 'Medendorp', 'test234');
INSERT INTO `student` (`id`, `email`, `first_name`, `is_valid`, `last_name`, `password`) VALUES (NULL, 'remond.karst@gmail.com', 'Remond', b'1', 'Karst', 'test345');
INSERT INTO `student` (`id`, `email`, `first_name`, `is_valid`, `last_name`, `password`) VALUES (NULL, 's.martens.ehv@gmail.com', 'Stefan', b'1', 'Martens', 'test345');
INSERT INTO `student` (`id`, `email`, `first_name`, `is_valid`, `last_name`, `password`) VALUES (NULL, 'schave76@gmail.com', 'Dave', b'1', 'Schellekens', 'test345');
INSERT INTO `instructor` (`id`, `email`, `first_name`, `is_valid`, `last_name`, `password`) VALUES (NULL, 'rosalynn.hardy@gmail.com', 'Rosalynn', b'1', 'Hardy', 'test987');
INSERT INTO `instructor` (`id`, `email`, `first_name`, `is_valid`, `last_name`, `password`) VALUES (NULL, 'digitaleservice@gmail.com', 'Felix', b'1', 'van Loenen', 'test876');
INSERT INTO `instructor` (`id`, `email`, `first_name`, `is_valid`, `last_name`, `password`) VALUES (NULL, 'bas.smulders@gmail.com', 'Bas', b'1', 'Smulders', 'test876');
INSERT INTO `student_class` (`id`, `name`) VALUES (NULL, 'Java 1 - Twente');
INSERT INTO `student_class` (`id`, `name`) VALUES (NULL, 'Java 2 - Eindhoven');
INSERT INTO `student_class` (`id`, `name`) VALUES (NULL, 'Java 1 - Utrecht');
INSERT INTO `student_class_students` (`student_class_id`, `students_id`) VALUES ('1', '1'), ('1', '2'), ('2', '3'), ('2', '4'), ('2', '5');
INSERT INTO `student_class_instructors` (`student_classes_id`, `instructors_id`) VALUES ('1', '2'), ('2', '2'), ('3', '1'), ('3', '2'), ('3', '3');
INSERT INTO `answer_list` (`id`) VALUES (NULL), (NULL), (NULL), (NULL), (NULL), (NULL), (NULL), (NULL), (NULL);
INSERT INTO `answer_list_answers` (`answer_list_id`, `answers`) VALUES ('1', b'1'), ('1', b'0'), ('1', b'0'), ('1', b'0'), ('1', b'0'), ('1', b'0'), ('1', b'0'), ('1', b'0'), ('1', b'0'), ('1', b'0');
INSERT INTO `answer_list_answers` (`answer_list_id`, `answers`) VALUES ('2', b'0'), ('2', b'1'), ('3', b'1'), ('2', b'0'), ('2', b'0'), ('2', b'0'), ('2', b'0'), ('2', b'0'), ('2', b'0'), ('2', b'0');
INSERT INTO `answer_list_answers` (`answer_list_id`, `answers`) VALUES ('3', b'1'), ('3', b'0'), ('3', b'0'), ('3', b'0'), ('3', b'0'), ('3', b'0'), ('3', b'0'), ('3', b'0'), ('3', b'0'), ('3', b'0');
INSERT INTO `answer_list_answers` (`answer_list_id`, `answers`) VALUES ('4', b'0'), ('4', b'1'), ('4', b'0'), ('4', b'0'), ('4', b'0'), ('4', b'0'), ('4', b'0'), ('4', b'0'), ('4', b'0'), ('4', b'0');
INSERT INTO `answer_list_answers` (`answer_list_id`, `answers`) VALUES ('5', b'1'), ('5', b'0'), ('5', b'0'), ('5', b'1'), ('5', b'0'), ('5', b'0'), ('5', b'0'), ('5', b'0'), ('5', b'0'), ('5', b'0');
INSERT INTO `answer_list_answers` (`answer_list_id`, `answers`) VALUES ('6', b'1'), ('6', b'1'), ('6', b'0'), ('6', b'0'), ('6', b'0'), ('6', b'0'), ('6', b'0'), ('6', b'0'), ('6', b'0'), ('6', b'0');
INSERT INTO `answer_list_answers` (`answer_list_id`, `answers`) VALUES ('7', b'0'), ('7', b'0'), ('7', b'0'), ('7', b'0'), ('7', b'0'), ('7', b'0'), ('7', b'0'), ('7', b'0'), ('7', b'0'), ('7', b'0');
INSERT INTO `answer_list_answers` (`answer_list_id`, `answers`) VALUES ('8', b'0'), ('8', b'0'), ('8', b'1'), ('8', b'0'), ('8', b'0'), ('8', b'0'), ('8', b'0'), ('8', b'0'), ('8', b'0'), ('8', b'0');
INSERT INTO `answer_list_answers` (`answer_list_id`, `answers`) VALUES ('9', b'1'), ('9', b'1'), ('9', b'0'), ('9', b'0'), ('9', b'0'), ('9', b'0'), ('9', b'0'), ('9', b'0'), ('9', b'0'), ('9', b'0');
INSERT INTO `question` (`id`, `creation_date_time`, `for_exam`, `is_enabled`, `name`, `programming_language`, `explanation_answer`, `is_obsolete`, `question`, `type_of_question`, `creator_id`, `correct_answers_id`) VALUES (NULL, '2016-11-15 9:15:32', '1', b'1', 'Testing for loop', '1', 'Yes, the for loop is correct!', b'0', 'Is the following statement correct?
<pre>
  for (int a = 0; a < 10; a++)
    a = a * a;
  }
</pre>
Or do you prefer?
<pre>
  for (int a = 0; a < 10; a++)
    b = a + a;
  }
</pre>', 'for loop', '1', '1');
INSERT INTO `question` (`id`, `creation_date_time`, `for_exam`, `is_enabled`, `name`, `programming_language`, `explanation_answer`, `is_obsolete`, `question`, `type_of_question`, `creator_id`, `correct_answers_id`) VALUES (NULL, '2016-11-15 9:17:32', '3', b'1', 'If in for', '2', 'Yes, correct!', b'0', 'Is the following statement correct?
<pre>
  for (int a = 0; a < 10; a++)
    if (a * a > 10) {
	    break;
	  }
  }
</pre>', 'if', '1', '1');
INSERT INTO `question_possible_answers` (`question_id`, `possible_answers`) VALUES ('1', 'Yes, it is correct'), ('1', 'No, a*a cannot be within a for loop');
INSERT INTO `question_possible_answers` (`question_id`, `possible_answers`) VALUES ('2', 'Yes, it is correct'), ('2', 'No, a*a cannot be within a for loop'), ('2', 'No, the break is not allowed in the if statement');
INSERT INTO `question_given_answers` (`question_id`, `given_answers_id`) VALUES ('1', '3'), ('1', '4');
INSERT INTO `question_given_answers` (`question_id`, `given_answers_id`) VALUES ('2', '5'), ('2', '6'), ('2', '7'), ('2', '9');
INSERT INTO `test_template` (`id`, `creation_date_time`, `for_exam`, `is_enabled`, `name`, `programming_language`, `attempt_time_in_minutes`, `creator_id`) VALUES (NULL, '2016-11-15 9:25:32', '1', b'1', 'First OCA exam', '1', '120', '1');
INSERT INTO `test_template` (`id`, `creation_date_time`, `for_exam`, `is_enabled`, `name`, `programming_language`, `attempt_time_in_minutes`, `creator_id`) VALUES (NULL, '2016-11-15 9:35:32', '1', b'1', 'Sceond OCA exam', '1', '120', '2');
INSERT INTO `test_template_questions` (`test_template_id`, `questions_id`) VALUES ('1', '1'), ('1', '2');
INSERT INTO `test_template_questions` (`test_template_id`, `questions_id`) VALUES ('2', '1'), ('2', '2');
INSERT INTO `attempt` (`id`, `end_date_time`, `start_date_time`, `time_to_complete_in_seconds`, `test_template_id`) VALUES (NULL, '2016-11-15 11:15:32', '2016-11-15 9:15:32', '7200', '1');
INSERT INTO `attempt` (`id`, `end_date_time`, `start_date_time`, `time_to_complete_in_seconds`, `test_template_id`) VALUES (NULL, '2016-11-15 11:05:32', '2016-11-15 9:15:32', '6600', '1');
INSERT INTO `attempt` (`id`, `end_date_time`, `start_date_time`, `time_to_complete_in_seconds`, `test_template_id`) VALUES (NULL, '2016-11-15 11:25:32', '2016-11-15 9:15:32', '7800', '2');
INSERT INTO `attempt_marked_questions` (`attempt_id`, `marked_questions`) VALUES ('1', b'0');
INSERT INTO `attempt_marked_questions` (`attempt_id`, `marked_questions`) VALUES ('2', b'0'), ('2', b'1');
INSERT INTO `attempt_given_answers` (`attempt_id`, `given_answers_id`) VALUES ('1', '2'), ('1', '3');
INSERT INTO `attempt_given_answers` (`attempt_id`, `given_answers_id`) VALUES ('2', '4'), ('2', '5');
INSERT INTO `attempt_given_answers` (`attempt_id`, `given_answers_id`) VALUES ('3', '6'), ('3', '7'), ('3', '9');
