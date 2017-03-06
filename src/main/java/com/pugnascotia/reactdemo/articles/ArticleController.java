package com.pugnascotia.reactdemo.articles;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.pugnascotia.reactdemo.utils.State.populateModel;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Handles requests for the "add a comment" page. This is handled
 * by our UI stack without any additional context.
 */

@Controller
public class ArticleController {

    @RequestMapping(value = "/add", method = GET)
    public String index(Model model, HttpServletRequest request) {
		populateModel(model, request);
        return "index";
    }
}
