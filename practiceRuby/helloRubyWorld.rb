#!/usr/bin/ruby -w

END {
    puts "everything has an and which has a start"
}

puts "Hello Ruby!"

puts "We should use semicolon or not?"


print <<sajt

So right now I can write anything here to multiple time!
Haha! That's so cool!

What is the meaning of life? --->  42

It seems spaces very important in ruby sometimes.

sajt


BEGIN {
    puts "This called before program runing. Not bad but also not nice to put init code everyWhere to the source.
        In a big messy project with many files and tons of codes who will be track init code like this?"
}


# one comment
# another comment
=begin
tons of comments
=end

class MyFirstClassInRuby
    @instanceVariable = 0
    @@ClassVariable = 0
    $globalVariableAcrossTheEntiryProgram = 0 #o my good

    def initialize(name) 
        @instanceVariableCreatedHere = name # don't do that with production code. My opinion is to hard to read. Don't create instance variables eveywhere like a cowboy!
    end

    def myFirstClassFunction 
        puts "this is a function call from my first class"
    end
end

veryFirst = MyFirstClassInRuby.new("so this is a name")
veryFirst.myFirstClassFunction
