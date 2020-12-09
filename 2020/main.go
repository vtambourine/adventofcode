package main

import (
	"fmt"
	"os"
	"strings"

	"github.com/vtambourine/adventofcode/2020/challenge"
	"github.com/vtambourine/adventofcode/2020/command"
	"github.com/vtambourine/adventofcode/2020/day01.report_repair"
	"github.com/vtambourine/adventofcode/2020/day02.password_philosophy"
	"github.com/vtambourine/adventofcode/2020/day03.toboggan_trajectory"
	"github.com/vtambourine/adventofcode/2020/day04.passport_processing"
	"github.com/vtambourine/adventofcode/2020/day05.binary_boarding"
	"github.com/vtambourine/adventofcode/2020/day06.custom_customs"
	"github.com/vtambourine/adventofcode/2020/day07.handy_haversacks"
)

var (
	solutions = make(command.Solutions)
)

func init() {
	day01.Register(solutions)
	day02.Register(solutions)
	day03.Register(solutions)
	day04.Register(solutions)
	day05.Register(solutions)
	day06.Register(solutions)
	day07.Register(solutions)
}

func main() {
	arg := os.Args[1]
	for day, parts := range solutions {
		for part, solution := range parts {
			if arg == fmt.Sprintf("%d%s", day, part) {
				fmt.Printf(
					"Day %d - Part %s: Answer is %d",
					day, strings.ToUpper(part), solution(challenge.ReadFromDay(day)),
				)
				os.Exit(0)
			}
		}
	}

	panic(fmt.Sprintf("bad arguments: %s", arg))
}
