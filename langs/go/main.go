package main

import (
	"html/template"
	"log"
	"net/http"
	"path/filepath"
	"strings"
)

// GenerateCSPHeader dynamically creates the Content Security Policy header
func GenerateCSPHeader(policy map[string][]string) string {
	var directives []string
	for directive, sources := range policy {
		// Join the sources with a space to form the directive's value
		directives = append(directives, directive+" "+strings.Join(sources, " "))
	}
	return strings.Join(directives, "; ")
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Define the dynamic CSP policy
		cspPolicy := map[string][]string{
			"default-src": {"'self'"},
		}

		// Set the dynamic CSP header
		w.Header().Set("Content-Security-Policy", GenerateCSPHeader(cspPolicy))

		// Load and parse the template file
		tmplPath := filepath.Join("templates", "index.html")
		tmpl, err := template.ParseFiles(tmplPath)
		if err != nil {
			http.Error(w, "Unable to load template", http.StatusInternalServerError)
			log.Printf("Error loading template: %v", err)
			return
		}

		// Execute the template
		err = tmpl.Execute(w, nil)
		if err != nil {
			http.Error(w, "Unable to render template", http.StatusInternalServerError)
			log.Printf("Error rendering template: %v", err)
		}
	})

	// Start the server
	if err := http.ListenAndServe(":80", nil); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
