package samples

import (
	"fmt"
)

func main() {
	name := EnvName()
	fmt.Printf("hello %s", name)
}

func EnvName() string {
	name := "user"
	// get username from os

	return name
}
